import { Queue } from 'bullmq';
import IORedis from 'ioredis';

let connection: IORedis | undefined;
let cleanupQueue: Queue | undefined;

export function getQueue(): Queue {
  if (!connection) {
    connection = new IORedis(process.env.REDISS_URL as string, {
      maxRetriesPerRequest: null,
      tls: {},
    });
    connection.on('error', (err) => {
      console.error('خطای اتصال به Redis:', err.message);
    });
  }
  if (!cleanupQueue) {
    cleanupQueue = new Queue('cleanup', { connection });
  }
  return cleanupQueue;
}