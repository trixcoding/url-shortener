'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{ code: string; shortUrl: string } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch('/api/test/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'خطایی رخ داد');
      } else {
        setResult(data);
        setUrl('');
      }
    } catch {
      setError('اتصال برقرار نشد');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) navigator.clipboard.writeText(result.shortUrl);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">لینکتو کوتاه کن</h1>
        <p className=" text-gray-500 mb-6">آدرس طولانی رو بده، کوتاهش کن</p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="url"
            placeholder="لینک رو وارد کن"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg px-5 py-2.5 transition"
          >
            {loading ? '...' : 'کوتاه کن'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

        {result && (
          <div className="mt-5 border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-between gap-3">
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium truncate hover:underline"
            >
              {result.shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1.5 shrink-0 transition"
            >
              کپی
            </button>
          </div>
        )}

        <Link
          href="/dashboard"
          className="block mt-8 text-center text-blue-600 hover:underline font-medium"
        >
          مشاهده‌ی داشبورد ←
        </Link>
      </div>
    </div>
  );
}