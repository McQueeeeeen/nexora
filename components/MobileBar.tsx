"use client";

// Мобильная CTA-панель как у эталона (Email / Call / Get a Quote) — у нас Telegram + аудит.
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-6 lg:hidden"
      style={{ background: "linear-gradient(to top, #0c0c0ce6, transparent)" }}>
      <div className="flex gap-2">
        <a href="https://t.me/nexora_support" target="_blank"
          className="mp5-btn mp5-btn--secondary h-12 flex-1 rounded-xl text-sm backdrop-blur-md">
          Telegram
        </a>
        <a href="#contact" className="mp5-btn mp5-btn--primary h-12 flex-1 rounded-xl text-sm">
          Бесплатный аудит
        </a>
      </div>
    </div>
  );
}
