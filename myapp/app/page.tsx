'use client';

import { useState } from 'react';

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
                                                                                                                                                          <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '1rem' }}>
                                                                                                                                                                <h1>لینک کوتاه‌کن</h1>

                                                                                                                                                                      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                                                                                                                                                              <input
                                                                                                                                                                                        type="url"
                                                                                                                                                                                                  placeholder="آدرس طولانی رو وارد کن"
                                                                                                                                                                                                            value={url}
                                                                                                                                                                                                                      onChange={(e) => setUrl(e.target.value)}
                                                                                                                                                                                                                                required
                                                                                                                                                                                                                                          style={{ flex: 1, padding: '0.5rem' }}
                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                          <button type="submit" disabled={loading}>
                                                                                                                                                                                                                                                                    {loading ? '...' : 'کوتاه کن'}
                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                  </form>

                                                                                                                                                                                                                                                                                        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

                                                                                                                                                                                                                                                                                              {result && (
                                                                                                                                                                                                                                                                                                      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
                                                                                                                                                                                                                                                                                                                <p>لینک کوتاه شما:</p>
                                                                                                                                                                                                                                                                                                                          <a href={result.shortUrl} target="_blank" rel="noreferrer">
                                                                                                                                                                                                                                                                                                                                      {result.shortUrl}
                                                                                                                                                                                                                                                                                                                                                </a>
                                                                                                                                                                                                                                                                                                                                                          <button onClick={copyToClipboard} style={{ marginRight: '1rem' }}>
                                                                                                                                                                                                                                                                                                                                                                      کپی
                                                                                                                                                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                              )}

                                                                                                                                                                                                                                                                                                                                                                                                    <a href="/dashboard" style={{ display: 'block', marginTop: '2rem' }}>
                                                                                                                                                                                                                                                                                                                                                                                                            مشاهده‌ی داشبورد →
                                                                                                                                                                                                                                                                                                                                                                                                                  </a>
                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                        }