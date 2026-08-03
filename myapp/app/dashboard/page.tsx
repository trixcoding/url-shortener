'use client';

import { useEffect, useState } from 'react';
import { LinkWithClicks } from '../types/links'; 

export default function Dashboard() {
  const [links, setLinks] = useState<LinkWithClicks[]>([]);

    const fetchLinks = async () => {
        const res = await fetch('/api/test/links');
            const data = await res.json();
                setLinks(data);
                  };

                    useEffect(() => {
                        fetchLinks();
                            const interval = setInterval(fetchLinks, 4000); // رفرش هر ۴ ثانیه
                                return () => clearInterval(interval);
                                  }, []);

                                    return (
                                        <div style={{ padding: '2rem' }}>
                                              <h1>داشبورد لینک‌ها</h1>
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
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                              }