import pool from '../lib/db';
import redis from '../lib/redis';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
  req: NextRequest,
    { params }: { params: Promise<{ code: string }> }
    ) {
      const { code } = await params;

        // ۱. اول از Redis بخون
          const cached = await redis.get<string>(`link:${code}`);

            if (cached) {
                redis.incr(`clicks:${code}`);
                    return NextResponse.redirect(cached);
                      }

                        // ۲. Cache Miss → برو سراغ Postgres
                          const result = await pool.query(
                              'SELECT original_url FROM links WHERE code = $1',
                                  [code]
                                    );

                                      if (result.rows.length === 0) {
                                          return NextResponse.redirect(new URL('/not-found', req.url));
                                            }

                                              const originalUrl: string = result.rows[0].original_url;

                                                // برگردوندنش توی کش برای دفعه‌ی بعد
                                                  await redis.set(`link:${code}`, originalUrl);
                                                    redis.incr(`clicks:${code}`);

                                                      return NextResponse.redirect(originalUrl);
                                                      }