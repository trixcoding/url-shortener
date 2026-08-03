export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="text-6xl mb-4">🔗</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">لینک پیدا نشد</h1>
        <p className="text-gray-500 mb-8">
          این کد کوتاه معتبر نیست یا حذف شده.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition"
        >
          بازگشت به صفحه‌ی اصلی
        </a>
      </div>
    </div>
  );
}