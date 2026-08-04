'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CleanupButton() {
  const [loading, setLoading] = useState(false);

  async function handleCleanup() {
    setLoading(true);
    const toastId = toast.loading('در حال ارسال به صف...');

    try {
      const res = await fetch('/api/admin/cleanup', { method: 'POST' });
      if (!res.ok) throw new Error('request failed');

      const data = await res.json();

      toast.success(`job #${data.jobId} ثبت شد — worker به‌زودی پردازش می‌کنه`, {
        id: toastId,
      });
    } catch {
      toast.error('خطا در ثبت job', { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCleanup}
      disabled={loading}
      className="text-sm bg-gray-800 hover:bg-gray-900 disabled:opacity-50 text-white rounded-lg px-4 py-2 transition"
    >
      {loading ? 'در حال ارسال به صف...' : '⚙️ پاکسازی با BullMQ'}
    </button>
  );
}
