"use client";

// Мобильная CTA-панель как у эталона — светлое стекло, teal-кнопка.
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-6 lg:hidden"
      style={{ background: "linear-gradient(to top, #F7F5EFf2, transparent)" }}>
      <div className="flex gap-2">
        <a href="https://t.me/nexora_support" target="_blank" rel="noopener"
          className="flex h-12 flex-1 items-center justify-center rounded-xl border border-[#101418]/15 bg-white/85 text-sm font-semibold text-[#101418] backdrop-blur-md">
          Telegram
        </a>
        <a href="#contact" className="mp5-btn mp5-btn--primary h-12 flex-1 rounded-xl text-sm">
          Бесплатный аудит
        </a>
      </div>
    </div>
  );
}
