"use client";

import { Btn } from "../components/ui";

// Ловит падение любого клиентского дерева — вместо белого экрана.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F7F5EF] px-6 text-center text-[#101418]">
      <span className="font-mono text-sm font-bold uppercase tracking-[1px] text-[var(--brand)]">Ошибка</span>
      <h1 className="mt-4 max-w-[640px] text-4xl font-medium tracking-tight sm:text-6xl">Что-то пошло не так</h1>
      <p className="mt-4 max-w-[420px] text-[#101418]/60">Попробуйте обновить страницу. Если не поможет — напишите нам в Telegram.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={reset} className="mp5-btn mp5-btn--primary h-14 rounded-xl px-8 text-base">Попробовать снова</button>
        <Btn href="/" outline className="h-14 rounded-xl px-8 text-base">На главную</Btn>
      </div>
    </main>
  );
}
