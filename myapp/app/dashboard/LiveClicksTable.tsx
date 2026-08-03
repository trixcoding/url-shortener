'use client';

import { useEffect, useState } from 'react';
import { LinkWithClicks } from '../types/links';

export default function LiveClicksTable({
  initialLinks,
}: {
  initialLinks: LinkWithClicks[];
}) {
  const [links, setLinks] = useState<LinkWithClicks[]>(initialLinks);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/test/links');
      const data = await res.json();
      setLinks(data);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (code: string, shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  if (links.length === 0) {
    return <p className="text-gray-400 text-center py-10">هنوز لینکی ساخته نشده.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => {
        const shortUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${link.code}`;
        return (
          <div
            key={link.code}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition bg-white"
          >
            <div className="flex items-center justify-between gap-3">
              <a
                href={`/${link.code}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                {link.code}
              </a>
              <span className="bg-blue-50 text-blue-700 text-sm font-medium px-2.5 py-1 rounded-full shrink-0">
                {link.clicks} کلیک
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-1.5 truncate">{link.originalUrl}</p>

            <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-100">
              <span className="text-gray-400 text-xs truncate">{shortUrl}</span>
              <button
                onClick={() => handleCopy(link.code, shortUrl)}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1.5 shrink-0 transition"
              >
                {copiedCode === link.code ? 'کپی شد ✓' : 'کپی'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}