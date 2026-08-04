import { NextResponse } from 'next/server';
import { getQueue } from '../../../lib/queue';

export async function POST(): Promise<NextResponse> {
  const queue = getQueue();
    const job = await queue.add('manual-cleanup', {});

      return NextResponse.json({
          message: 'job پاکسازی دستی ثبت شد',
              jobId: job.id,
                });
                }