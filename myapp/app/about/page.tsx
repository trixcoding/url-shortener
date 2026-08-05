import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← بازگشت به صفحه‌ی اصلی
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
          چرا این پروژه رو ساختم
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          این یک لینک‌کوتاه‌کن با آمار زنده‌ست که برای نمایش سه مفهوم پایه‌ی
          Redis در یک اپلیکیشن Next.js واقعی ساخته شده: کش کردن با الگوی
          Cache-Aside، محدود کردن نرخ درخواست (Rate Limiting)، و شمارش
          real-time. هدف این بود که به‌جای پیاده‌سازی جدا جدای هر مفهوم، همه
          رو در یک جریان کاربری واحد و منسجم نشون بدم.
        </p>
        <p className="text-gray-600 leading-relaxed mb-8">
          برای پاکسازی داده‌ها به‌جای اجرای این کار داخل خودِ اپ Next.js، یک
          Worker جدا با BullMQ ساختم که روی Railway (نه Vercel) دیپلوی شده.
          این تصمیم عمدی بود: کارهای پس‌زمینه‌ی طولانی یا زمان‌بندی‌شده جای
          مناسبی توی محیط Serverless مثل Vercel ندارن، پس یک process مستقل و
          همیشه-روشن براش در نظر گرفتم — دقیقاً همون الگویی که در محیط
          production واقعی هم استفاده می‌شه.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mb-4">مسیر یک درخواست</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">مرحله</th>
                <th className="px-4 py-3 font-medium">چه اتفاقی می‌افته</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 text-gray-900">ساخت لینک</td>
                <td className="px-4 py-3 text-gray-600">
                  ذخیره در Postgres + کش فوری در Redis (نوشتن Cache-Aside)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900">کلیک روی لینک</td>
                <td className="px-4 py-3 text-gray-600">
                  اول Redis چک می‌شه؛ فقط در Cache Miss سراغ Postgres می‌ره
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900">شمارش کلیک</td>
                <td className="px-4 py-3 text-gray-600">
                  افزایش شمارنده در Redis، بدون تأخیر در ریدایرکت کاربر
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900">ساخت لینک جدید</td>
                <td className="px-4 py-3 text-gray-600">
                  محدود به تعداد مشخص در دقیقه برای هر IP (Fixed Window)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900">پاکسازی شبانه</td>
                <td className="px-4 py-3 text-gray-600">
                  Worker جدا با BullMQ (روی Railway) هر شب لینک‌های منقضی و
                  کلیدهای rate-limit باقی‌مانده در Redis رو پاک می‌کنه
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900">پاکسازی دستی</td>
                <td className="px-4 py-3 text-gray-600">
                  دکمه‌ی «پاکسازی با BullMQ» در داشبورد یک job به صف می‌فرسته؛
                  Worker همون لحظه پردازشش می‌کنه، بدون نیاز به منتظر ماندن تا شب
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-3">معماری فنی</h2>
        <ul className="text-gray-600 leading-relaxed space-y-2 mb-8 list-disc pr-5">
          <li>
            الگوی <span className="text-gray-900 font-medium">Cache-Aside</span>{' '}
            برای خواندن و نوشتن لینک‌ها، با Postgres به‌عنوان منبع اصلی داده
          </li>
          <li>
            <span className="text-gray-900 font-medium">Rate Limiting</span> با
            دستورهای{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              INCR
            </code>{' '}
            و{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              EXPIRE
            </code>{' '}
            در Redis
          </li>
          <li>
            داشبورد با{' '}
            <span className="text-gray-900 font-medium">Server Component</span>{' '}
            برای دیتای اولیه، و یک Client Component کوچیک فقط برای رفرش زنده‌ی
            کلیک‌ها
          </li>
          <li>
            شمارنده‌ی کلیک به‌صورت fire-and-forget ثبت می‌شه تا سرعت ریدایرکت
            کاربر تحت تأثیر قرار نگیره
          </li>
          <li>
            یک Worker مستقل با{' '}
            <span className="text-gray-900 font-medium">BullMQ</span> روی
            Railway اجرا می‌شه که جدا از اپ اصلیه؛ یک job شبانه‌ی زمان‌بندی‌شده
            لینک‌های منقضی و کلیدهای rate-limit قدیمی رو پاک می‌کنه
          </li>
          <li>
            دکمه‌ی پاکسازی دستی در داشبورد همون صف BullMQ رو به‌صورت آنی صدا
            می‌زنه — نشون‌دهنده‌ی الگوی Queue/Worker جدا از trigger زمان‌بندی‌شده
          </li>
        </ul>

        <div className="border-t border-gray-100 pt-6">
          <a
            href="https://github.com/trixcoding/url-shortener"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition text-sm"
          >
            مشاهده‌ی کد کامل روی گیت‌هاب
          </a>
        </div>
      </div>
    </div>
  );
}