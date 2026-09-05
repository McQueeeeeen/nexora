import { Btn, wrap } from "../components/ui";

// 404 — в фирменной стилистике сайта: тёмный фон, жёлтая кнопка домой.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0C0C0C] px-6 text-center text-white">
      <span className="font-mono text-sm font-bold uppercase tracking-[2px] text-[#FFE533]">404</span>
      <h1 className="mt-4 max-w-[640px] text-4xl font-medium tracking-tight sm:text-6xl">Такой страницы нет</h1>
      <p className="mt-4 max-w-[420px] text-white/60">Возможно, адрес изменился. Вернитесь на главную — там вузы, гранты и бесплатный аудит.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Btn href="/" className="h-14 rounded-xl px-8 text-base">На главную</Btn>
        <Btn href="/austria" ghost className="h-14 rounded-xl px-8 text-base">Вузы Австрии</Btn>
      </div>
    </main>
  );
}
