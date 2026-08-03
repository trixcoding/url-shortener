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
    <div style={{ padding: '2rem' }}>
      <h1>داشبورد لینک‌ها</h1>
      <LiveClicksTable initialLinks={links} />
    </div>
  );
}