"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Y, onRafScroll, Reveal, ArrowIcon, CheckIcon } from "./ui";

// Контакты + футер: параллакс дословно по формуле эталона (проценты,
// сглаживание lerp, вуаль .85), появление блоков, кнопка наверх.
export default function Contact() {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", country: "", about: "" });
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const pre = usePathname() === "/" ? "" : "/";

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Отправка через FormSubmit на admissions@nexora.eu (без бэкенда и ключей).
  // Первое письмо требует клика-подтверждения из ящика (активация FormSubmit).
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch("https://formsubmit.co/ajax/admissions@nexora.eu", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `NEXORA — заявка: ${form.name || "без имени"}`,
          _template: "table",
          _captcha: "true",
          _honey: "",
          Имя: form.name,
          Телефон: form.phone,
          Email: form.email || "—",
          "Страна и уровень": form.country || "—",
          "О себе": form.about || "—",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  // Сглаживание как у эталона (lerp .18 к цели каждый кадр) — напрямую в DOM без ре-рендеров React.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 992) return;

    let cur = 0;
    let target = 0;
    let raf = 0;

    const compute = () => {
      if (!containerRef.current) return 0;
      const r = containerRef.current.getBoundingClientRect();
      return Math.max(0, Math.min(1, (window.innerHeight - r.top) / window.innerHeight));
    };

    const tick = () => {
      raf = 0;
      target = compute();
      const next = cur + (target - cur) * 0.18;
      cur = Math.abs(target - next) < 0.0005 ? target : next;
      if (innerRef.current) {
        innerRef.current.style.transform = `translateY(${(-75 * (1 - cur)).toFixed(2)}%)`;
      }
      if (darkRef.current) {
        darkRef.current.style.opacity = (0.85 * (1 - cur)).toFixed(3);
      }
      if (cur !== target) {
        raf = requestAnimationFrame(tick);
      }
    };

    const unsub = onRafScroll(() => {
      if (!raf) raf = requestAnimationFrame(tick);
    });
    tick();

    return () => {
      unsub();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const [top, setTop] = useState(false);
  useEffect(() => {
    return onRafScroll(() => {
      const v = window.scrollY > window.innerHeight * 1.5;
      setTop((prev) => (prev === v ? prev : v));
    });
  }, []);

  return (
    <div ref={containerRef} data-footer-parallax style={{ position: "relative", overflow: "hidden" }}>
      <div ref={innerRef} data-footer-parallax-inner style={{ transform: "translateY(-75%)", willChange: "transform" }}>
        <footer id="contact" className="relative overflow-hidden bg-[#2A211D] px-4 pb-[76px] pt-20 text-[#FBF9F5] lg:px-12 lg:pb-10 lg:pt-24">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(60% 45% at 85% 0%, rgba(251,249,245,0.06), transparent 70%), radial-gradient(50% 40% at 10% 100%, rgba(251,249,245,0.04), transparent 70%)" }} />
          <div className="relative mx-auto flex max-w-[1408px] flex-col gap-6">
            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="border-b border-[#FBF9F5]/12 pb-6">
                <span className="font-mono text-base font-bold uppercase text-[#FBF9F5]/60">Контакты</span>
              </div>
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-5">
                <Reveal className="flex flex-col lg:flex-1">
                  <h3 className="text-[28px] font-normal leading-[1.05] tracking-[-1px] text-[#FBF9F5] lg:text-[48px] lg:tracking-[-1.6px]">
                    Персональная консультация — €10
                  </h3>
                  <p className="mt-4 text-lg text-[#FBF9F5]/70 lg:text-xl">Оценим шансы на грант, проверим дедлайны и составим план поступления.</p>
                  <div className="mt-8 space-y-3 text-sm text-[#FBF9F5]/85">
                    <p><b>Telegram:</b> <a href="https://t.me/nexora_support" target="_blank" rel="noopener" className="underline hover:text-white" style={{ color: "#FBF9F5" }}>@nexora_support</a></p>
                    <p><b>Email:</b> <a href="mailto:admissions@nexora.eu" className="underline break-all hover:text-white" style={{ color: "#FBF9F5" }}>admissions@nexora.eu</a></p>
                    <p><b>На связи:</b> Пн–Вс, 8:00–18:00</p>
                  </div>
                </Reveal>
                <Reveal className="flex flex-col gap-5 lg:flex-1">
                  {sent ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                      <span className="text-[#FBF9F5]"><CheckIcon className="h-14 w-14" /></span>
                      <h4 className="mt-4 text-2xl font-medium text-[#FBF9F5]">Заявка принята</h4>
                      <p className="mt-2 max-w-sm text-[#FBF9F5]/70">Свяжемся в течение 30 минут, подтвердим время консультации (€10).</p>
                    </div>
                  ) : (
                    <form onSubmit={submit} className="flex flex-col gap-5">
                      <div className="flex gap-1.5" aria-hidden>
                        {[0, 1].map((d) => (
                          <span key={d} className="h-1.5 rounded-full transition-all" style={d <= step ? { width: 32, background: "#FBF9F5" } : { width: 8, background: "rgba(251,249,245,0.2)" }} />
                        ))}
                      </div>
                      {step === 0 ? (
                        <>
                          <div className="flex flex-col gap-5 lg:flex-row lg:gap-2.5">
                            <div className="flex flex-1 flex-col gap-2">
                              <label htmlFor="nx-name" className="font-mono text-xs font-bold uppercase text-[#FBF9F5]/60">Ваше имя<span className="text-[#FBF9F5]"> *</span></label>
                              <input id="nx-name" required value={form.name} onChange={set("name")} placeholder="Иван Иванов" autoComplete="name" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                              <label htmlFor="nx-phone" className="font-mono text-xs font-bold uppercase text-[#FBF9F5]/60">Телефон<span className="text-[#FBF9F5]"> *</span></label>
                              <input id="nx-phone" required value={form.phone} onChange={set("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (999) 000-00-00" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="nx-email" className="font-mono text-xs font-bold uppercase text-[#FBF9F5]/60">Email</label>
                            <input id="nx-email" value={form.email} onChange={set("email")} type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <button type="button" onClick={(e) => { const f = e.currentTarget.form; if (f && !f.reportValidity()) return; setStep(1); }} className="mp5-btn mp5-btn--light w-full rounded-xl text-base font-semibold" style={{ height: 56 }}>Продолжить</button>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="nx-country" className="font-mono text-xs font-bold uppercase text-[#FBF9F5]/60">Страна и уровень</label>
                            <input id="nx-country" value={form.country} onChange={set("country")} placeholder="Например: Бакалавриат в Австрии" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="nx-about" className="font-mono text-xs font-bold uppercase text-[#FBF9F5]/60">О себе (оценки, язык)</label>
                            <input id="nx-about" value={form.about} onChange={set("about")} placeholder="Например: GPA 4.5, английский B2" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#FBF9F5]/70">
                            <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#2A211D]" />
                            <span>Соглашаюсь на обработку персональных данных для связи по заявке. <a href="/privacy" className="underline hover:text-white">Политика конфиденциальности</a>.</span>
                          </label>
                          {/* honeypot против спам-ботов */}
                          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden value="" readOnly />
                          {failed && <p className="text-sm text-red-300">Не отправилось — проверьте соединение и попробуйте ещё раз.</p>}
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(0)} className="mp5-btn mp5-btn--secondary flex items-center gap-2 rounded-xl px-6 text-base" style={{ height: 56 }}><ArrowIcon className="h-4 w-4 rotate-180" />Назад</button>
                            <button type="submit" disabled={sending} className="mp5-btn mp5-btn--light flex-1 rounded-xl text-base font-semibold" style={{ height: 56 }}>{sending ? "Отправляем…" : "Записаться на консультацию"}</button>
                          </div>
                        </>
                      )}
                    </form>
                  )}
                </Reveal>
              </div>
            </div>
            <div className="h-px bg-[#FBF9F5]/10 my-4" />

            {/* Главный блок футера — в точности по эталону */}
            <Reveal>
              <div className="grid grid-cols-1 gap-12 pt-6 lg:grid-cols-12 lg:gap-16">
                {/* Левая колонка: Логотип, About, Навигация */}
                <div className="flex flex-col justify-between gap-10 lg:col-span-7">
                  <div>
                    <a href="/" className="inline-block text-3xl font-bold tracking-tight text-[#FBF9F5] lg:text-4xl">
                      NEXORA<span className="text-[var(--accent)]">.</span>
                    </a>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-[#FBF9F5]/45">
                      О нас
                    </span>
                    <p className="max-w-lg text-[15px] leading-relaxed text-[#FBF9F5]/75 lg:text-base">
                      Агентство по поступлению за рубеж. Сопровождаем студентов в государственные, частные университеты и колледжи: от первой консультации и подбора программ до зачисления и студенческого ВНЖ.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-[#FBF9F5]/45">
                      Навигация
                    </span>
                    <nav className="flex flex-wrap items-center gap-x-7 gap-y-2 text-base font-medium text-[#FBF9F5]/85">
                      <a href={`${pre}#services`} className="hover-underline transition hover:text-[#FBF9F5]">Программы</a>
                      <a href="/austria" className="hover-underline transition hover:text-[#FBF9F5]">Австрия</a>
                      <a href="/hungary" className="hover-underline transition hover:text-[#FBF9F5]">Венгрия</a>
                      <a href="/reviews" className="hover-underline transition hover:text-[#FBF9F5]">Отзывы</a>
                      <a href="/blog" className="hover-underline transition hover:text-[#FBF9F5]">Блог</a>
                      <a href="/faq" className="hover-underline transition hover:text-[#FBF9F5]">FAQ</a>
                      <a href={`${pre}#contact`} className="hover-underline transition hover:text-[#FBF9F5]">Контакты</a>
                    </nav>
                  </div>
                </div>

                {/* Правая колонка: Телефон/Telegram, Локации, Email, Соцсети */}
                <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:pl-6">
                  {/* Telegram / Телефон */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-[#FBF9F5]/45">
                      Связь с куратором
                    </span>
                    <a
                      href="https://t.me/nexora_support"
                      target="_blank"
                      rel="noopener"
                      className="hover-underline text-2xl font-bold tracking-tight text-white transition lg:text-3xl"
                    >
                      @nexora_support
                    </a>
                  </div>

                  {/* Локации */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-[#FBF9F5]/45">
                      Локации и формат
                    </span>
                    <p className="text-[15px] leading-snug text-[#FBF9F5]/80">
                      Вена, Австрия<br />
                      Будапешт, Венгрия<br />
                      <span className="text-[#FBF9F5]/55">100% удалённо по всему миру</span>
                    </p>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-[#FBF9F5]/45">
                      Email
                    </span>
                    <a
                      href="mailto:admissions@nexora.eu"
                      className="hover-underline break-all text-base font-medium text-[#FBF9F5]/85 transition hover:text-white"
                    >
                      admissions@nexora.eu
                    </a>
                  </div>

                  {/* Соцсети / Мессенджеры (круглые кнопки по эталону) */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-[1.5px] text-[#FBF9F5]/45">
                      Мессенджеры
                    </span>
                    <div className="flex items-center gap-3">
                      {/* Telegram */}
                      <a
                        href="https://t.me/nexora_support"
                        target="_blank"
                        rel="noopener"
                        aria-label="Telegram"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-[var(--accent)] hover:text-[#2A211D]"
                      >
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                        </svg>
                      </a>
                      {/* Email */}
                      <a
                        href="mailto:admissions@nexora.eu"
                        aria-label="Email"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-[var(--accent)] hover:text-[#2A211D]"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                      {/* WhatsApp / Direct */}
                      <a
                        href="https://t.me/nexora_support"
                        target="_blank"
                        rel="noopener"
                        aria-label="Онлайн-чат"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-[var(--accent)] hover:text-[#2A211D]"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="h-px bg-[#FBF9F5]/10 mt-10 mb-6" />

            {/* Подвал — Sub-footer в 3 части по эталону */}
            <Reveal>
              <div className="flex flex-col gap-4 text-xs text-[#FBF9F5]/50 sm:flex-row sm:items-center sm:justify-between">
                <span>Copyright © 2026 Nexora Admissions. All Rights Reserved.</span>
                <a href="/privacy" className="hover-underline w-fit transition hover:text-white">
                  Privacy policy
                </a>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#FBF9F5]/40">
                  Study abroad · Nexora
                </span>
              </div>
            </Reveal>
          </div>
        </footer>
      </div>
      <div ref={darkRef} data-footer-parallax-dark aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: "0.85", pointerEvents: "none", backgroundColor: "#2A211D" }} />
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Наверх"
        className="fixed bottom-24 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-[#FBF9F5]/20 bg-[#2A211D]/90 text-[#FBF9F5] shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 lg:bottom-8 lg:right-8 lg:flex"
        style={{ opacity: top ? 1 : 0, pointerEvents: top ? "auto" : "none" }}>
        <span aria-hidden><ArrowIcon className="h-5 w-5 -rotate-90 text-[#FBF9F5]" /></span>
      </button>
    </div>
  );
}
