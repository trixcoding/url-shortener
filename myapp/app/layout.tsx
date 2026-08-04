import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Url Shortener",
  description: "Redis&PostgreSQL&BullMQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa" dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>

        <footer className="text-xs text-blue-600 text-center py-4 border-t border-blue-200">
          ساخته شده توسط <a
            href="https://mhmdnsr.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 hover:text-blue-900 underline"
          >MhmdNsr</a> | <a
            href="https://t.me/mhmdnsrr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 underline"
          >تلگرام</a>
        </footer>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
