import pool from '../../../lib/db';
import redis from '../../../lib/redis';
import { generateCode } from '../../../lib/generateCode';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const result = await pool.query(
        'SELECT code, original_url, created_at FROM links ORDER BY created_at DESC'
          );

            const links = await Promise.all(
                result.rows.map(async (row) => {
                      const clicks = await redis.get<number>(`clicks:${row.code}`);
                            return {
                                    code: row.code,
                                            originalUrl: row.original_url,
                                                    createdAt: row.created_at,
                                                            clicks: clicks ?? 0,
                                                                  };
                                                                      })
                                                                        );

                                                                          return NextResponse.json(links);
                                                                          }
export async function POST(req: NextRequest) {
  // ۱. Rate limiting: هر IP فقط ۱۰ درخواست در دقیقه
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
      const rateLimitKey = `ratelimit:create:${ip}`;
        const count = await redis.incr(rateLimitKey);
          if (count === 1) {
              await redis.expire(rateLimitKey, 60); // ۶۰ ثانیه
                }
                  if (count > 2) {
                      return NextResponse.json(
                            { error: 'تعداد درخواست‌ها بیش از حد مجاز است' },
                                  { status: 429 }
                                      );
                                        }

                                          // ۲. اعتبارسنجی ورودی
                                            const body = await req.json();
                                              const originalUrl = body.originalUrl;
                                                if (!originalUrl || typeof originalUrl !== 'string') {
                                                    return NextResponse.json({ error: 'آدرس نامعتبر است' }, { status: 400 });
                                                      }
                                                        try {
                                                            new URL(originalUrl);
                                                              } catch {
                                                                  return NextResponse.json({ error: 'فرمت URL درست نیست' }, { status: 400 });
                                                                    }

                                                                      // ۳. ساخت کد یکتا و ذخیره در Postgres
                                                                        const code = generateCode();
                                                                          await pool.query(
                                                                              'INSERT INTO links (code, original_url) VALUES ($1, $2)',
                                                                                  [code, originalUrl]
                                                                                    );

                                                                                      // ۴. کش کردن در Redis (Cache-Aside نوشتن)
                                                                                        await redis.set(`link:${code}`, originalUrl);

                                                                                          return NextResponse.json({
                                                                                              code,
                                                                                                  shortUrl: `${req.nextUrl.origin}/${code}`,
                                                                                                    });
                                                                                                    }