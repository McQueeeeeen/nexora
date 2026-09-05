import { Btn } from "../components/ui";

// 404 — в фирменной стилистике сайта: бумага, мята, кнопка домой.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBF9F5] px-6 text-center text-[#2A211D]">
      <span className="font-mono text-sm font-bold uppercase tracking-[1px] text-[var(--brand)]">404</span>
      <h1 className="mt-4 max-w-[640px] text-4xl font-medium tracking-tight sm:text-6xl">Такой страницы нет</h1>
      <p className="mt-4 max-w-[420px] text-[#2A211D]/60">Возможно, адрес изменился. Вернитесь на главную — там вузы, гранты и консультация за €10.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Btn href="/" className="h-14 rounded-xl px-8 text-base">На главную</Btn>
        <Btn href="/austria" outline className="h-14 rounded-xl px-8 text-base">Вузы Австрии</Btn>
      </div>
    </main>
  );
}
