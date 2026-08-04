import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { Pool } from 'pg';
import { scheduleNightlyCleanup } from './queue.js';

const connection = new IORedis(process.env.REDISS_URL, {
  maxRetriesPerRequest: null,
  tls: {},
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const worker = new Worker(
  'cleanup',
  async (job) => {
    await pool.query('TRUNCATE TABLE links RESTART IDENTITY CASCADE');
    await connection.flushdb();
    console.log('پاکسازی کامل انجام شد (Postgres + کل Redis)');
  },
  { connection }
);

worker.on('completed', (job) => console.log(`job ${job.id} تمام شد`));
worker.on('failed', (job, err) => console.error(`job ${job.id} خطا:`, err));

scheduleNightlyCleanup();