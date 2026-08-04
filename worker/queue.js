import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: {},
});

export const cleanupQueue = new Queue('cleanup', { connection });

export async function scheduleNightlyCleanup() {
  await cleanupQueue.add(
    'nightly-cleanup',
    {},
    { repeat: { pattern: '0 0 * * *' }, jobId: 'nightly-cleanup-job' }
  );
  console.log('job شبانه ثبت شد');
}