import pool from '../../lib/db';
import redis from '../../lib/redis';
import { NextResponse } from 'next/server';

export async function GET() {
  const dbResult = await pool.query('SELECT NOW()');
    await redis.set('test-key', 'hello');
      const redisResult = await redis.get('test-key');

        return NextResponse.json({
            db_time: dbResult.rows[0].now,
                redis_value: redisResult,
                  });
                  }