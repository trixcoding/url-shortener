import pool from '../lib/db';
import redis from '../lib/redis';
import LiveClicksTable from './LiveClicksTable';
import { LinkWithClicks } from '../../types/links';

export default async function DashboardPage() {
  const result = await pool.query(
    'SELECT code, original_url, created_at FROM links ORDER BY created_at DESC'
  );

  const links: LinkWithClicks[] = await Promise.all(
    result.rows.map(async (row) => ({
      code: row.code,
      originalUrl: row.original_url,
      createdAt: row.created_at,
      clicks: (await redis.get<number>(`clicks:${row.code}`)) ?? 0,
    }))
  );

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">داشبورد لینک‌ها</h1>
          <a
            href="/"
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition"
          >
            + لینک جدید
          </a>
        </div>
        <LiveClicksTable initialLinks={links} />
      </div>
    </div>
  );
}