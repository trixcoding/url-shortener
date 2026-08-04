'use client';

import { useEffect, useState } from 'react';

export default function CleanupButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'done' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
        setJobId(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleCleanup() {
    setStatus('loading');

    try {
      const res = await fetch('/api/admin/cleanup', {
        method: 'POST',
      });

      if (!res.ok) throw new Error('request failed');

      const data = await res.json();

      setJobId(data.jobId);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCleanup}
        disabled={status === 'loading'}
        className="text-sm bg-gray-800 hover:bg-gray-900 disabled:opacity-50 text-white rounded-lg px-4 py-2 transition"
      >
        {status === 'loading'
          ? 'در حال ارسال به صف...'
          : '⚙️ پاکسازی با BullMQ'}
      </button>

      {status === 'done' && (
        <p className="text-xs text-green-600">
          ✅ job #{jobId} ثبت شد — worker به‌زودی پردازش می‌کنه
        </p>
      )}

      {status === 'error' && (
        <p className="text-xs text-red-600">
          ❌ خطا در ثبت job
        </p>
      )}
    </div>
  );
}