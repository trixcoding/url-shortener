'use client';

import { useEffect, useState } from 'react';
import { LinkWithClicks } from '../types/link';

export default function LiveClicksTable({
  initialLinks,
}: {
  initialLinks: LinkWithClicks[];
}) {
  const [links, setLinks] = useState<LinkWithClicks[]>(initialLinks);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/links');
      const data = await res.json();
      setLinks(data);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <table style={{ width: '100%', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>کد</th>
          <th>آدرس اصلی</th>
          <th>کلیک‌ها</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link) => (
          <tr key={link.code}>
            <td>{link.code}</td>
            <td>{link.originalUrl}</td>
            <td>{link.clicks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}