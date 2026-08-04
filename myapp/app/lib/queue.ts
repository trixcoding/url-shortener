import { Queue } from 'bullmq';
import IORedis from 'ioredis';

let connection: IORedis | undefined;
let cleanupQueue: Queue | undefined;

export function getQueue(): Queue {
  if (!connection) {
    connection = new IORedis(process.env.REDIS_URL as string, {
      maxRetriesPerRequest: null,
      tls: {},
    });
  }
  if (!cleanupQueue) {
    cleanupQueue = new Queue('cleanup', { connection });
  }
  return cleanupQueue;
}