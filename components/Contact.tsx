"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Y, useViewportProgress, Reveal, ArrowIcon, CheckIcon } from "./ui";

// Контакты + футер: параллакс дословно по формуле эталона (проценты,
// сглаживание lerp, вуаль .85), появление блоков, кнопка наверх.
export default function Contact() {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [ref, p] = useViewportProgress<HTMLDivElement>();
  const pre = usePathname() === "/" ? "" : "/";

  // Сглаживание как у эталона (lerp .18 к цели каждый кадр).
  const [sv, setSv] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      setSv((prev) => {
        const next = prev + (p - prev) * 0.18;
        const v = Math.abs(p - next) < 0.0005 ? p : next;
        if (v !== p) raf = requestAnimationFrame(tick);
        return v;
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p]);

  const [top, setTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setTop((prev) => {
      const v = window.scrollY > window.innerHeight * 1.5;
      return prev === v ? prev : v;
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} data-footer-parallax style={{ position: "relative", overflow: "hidden" }}>
      <div data-footer-parallax-inner style={{ transform: `translateY(${(-75 * (1 - sv)).toFixed(2)}%)`, willChange: "transform" }}>
        <footer id="contact" className="relative overflow-hidden px-4 pb-[76px] pt-20 lg:px-12 lg:pb-10 lg:pt-24">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(60% 45% at 85% 0%, rgba(94,234,212,0.12), transparent 70%), radial-gradient(50% 40% at 10% 100%, rgba(94,234,212,0.08), transparent 70%)" }} />
          <div className="relative mx-auto flex max-w-[1408px] flex-col gap-6">
            <div className="flex flex-col gap-8 lg:gap-10">
              <div className="border-b border-[#101418]/10 pb-6">
                <span className="font-mono text-base font-bold uppercase text-[#101418]/60">Контакты</span>
              </div>
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-5">
                <Reveal className="flex flex-col lg:flex-1">
                  <h3 className="text-[28px] font-normal leading-[1.05] tracking-[-1px] lg:text-[48px] lg:tracking-[-1.6px]">
                    Персональная стратегия за 15 минут
                  </h3>
                  <p className="mt-4 text-lg text-[#101418]/60 lg:text-xl">Оценим шансы на грант, проверим дедлайны и составим план поступления.</p>
                  <div className="mt-8 space-y-3 text-sm text-[#101418]/80">
                    <p><b>Вена:</b> Schottengasse 4, 1010 Wien</p>
                    <p><b>Будапешт:</b> Váci utca 12, 1052 Budapest</p>
                    <p><b>Telegram:</b> <a href="https://t.me/nexora_support" target="_blank" rel="noopener" className="underline" style={{ color: Y }}>@nexora_support</a></p>
                    <p><b>Email:</b> <a href="mailto:admissions@nexora.eu" className="underline break-all" style={{ color: Y }}>admissions@nexora.eu</a></p>
                    <p><b>На связи:</b> Пн–Вс, 8:00–18:00</p>
                  </div>
                </Reveal>
                <Reveal className="flex flex-col gap-5 lg:flex-1">
                  {sent ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                      <span style={{ color: Y }}><CheckIcon className="h-14 w-14" /></span>
                      <h4 className="mt-4 text-2xl font-medium">Заявка принята</h4>
                      <p className="mt-2 max-w-sm text-[#101418]/65">Свяжемся в течение 30 минут для бесплатной диагностики.</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
                      <div className="flex gap-1.5" aria-hidden>
                        {[0, 1].map((d) => (
                          <span key={d} className="h-1.5 rounded-full transition-all" style={d <= step ? { width: 32, background: Y } : { width: 8, background: "rgba(16,20,24,0.15)" }} />
                        ))}
                      </div>
                      {step === 0 ? (
                        <>
                          <div className="flex flex-col gap-5 lg:flex-row lg:gap-2.5">
                            <div className="flex flex-1 flex-col gap-2">
                              <label className="font-mono text-xs font-bold uppercase text-[#101418]/45">Ваше имя<span style={{ color: Y }}> *</span></label>
                              <input required placeholder="Иван Иванов" className="input-light h-14 rounded-[10px] px-4 text-base" />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                              <label className="font-mono text-xs font-bold uppercase text-[#101418]/45">Телефон<span style={{ color: Y }}> *</span></label>
                              <input required type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (999) 000-00-00" className="input-light h-14 rounded-[10px] px-4 text-base" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase text-[#101418]/45">Email</label>
                            <input type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" className="input-light h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <button type="button" onClick={(e) => { const f = e.currentTarget.form; if (f && !f.reportValidity()) return; setStep(1); }} className="mp5-btn mp5-btn--primary w-full rounded-xl text-base" style={{ height: 56 }}>Продолжить</button>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase text-[#101418]/45">Страна и уровень</label>
                            <input placeholder="Например: Бакалавриат в Австрии" className="input-light h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase text-[#101418]/45">О себе (оценки, язык)</label>
                            <input placeholder="Например: GPA 4.5, английский B2" className="input-light h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(0)} className="mp5-btn mp5-btn--outline flex items-center gap-2 rounded-xl px-6 text-base" style={{ height: 56 }}><ArrowIcon className="h-4 w-4 rotate-180" />Назад</button>
                            <button type="submit" className="mp5-btn mp5-btn--primary flex-1 rounded-xl text-base" style={{ height: 56 }}>Записаться на аудит</button>
                          </div>
                        </>
                      )}
                    </form>
                  )}
                </Reveal>
              </div>
            </div>
            <div className="h-px bg-white/10" />
            <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="text-2xl font-bold text-[#101418]">NEXORA<span style={{ color: Y }}>.</span></div>
                <p className="mt-3 font-mono text-xs uppercase text-[#101418]/50">Study abroad. Start here.</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#101418]/60">Помогаем поступить в университеты Австрии и Венгрии: аудит, гранты, документы и ВНЖ под ключ.</p>
                <nav className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xl font-medium text-[#101418]/80">
                  <a href={`${pre}#services`} className="hover-underline transition hover:text-[#101418]">Программы</a>
                  <a href="/austria" className="hover-underline transition hover:text-[#101418]">Австрия</a>
                  <a href="/hungary" className="hover-underline transition hover:text-[#101418]">Венгрия</a>
                  <a href={`${pre}#faq`} className="hover-underline transition hover:text-[#101418]">FAQ</a>
                </nav>
              </div>
              <div className="flex flex-col gap-6 text-[#101418]/85">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[1px] text-[#101418]/45">Telegram</span>
                  <p className="mt-2"><a href="https://t.me/nexora_support" target="_blank" rel="noopener" className="hover-underline text-lg transition hover:text-[#101418]">@nexora_support</a></p>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[1px] text-[#101418]/45">Почта</span>
                  <p className="mt-2"><a href="mailto:admissions@nexora.eu" className="hover-underline break-all text-lg transition hover:text-[#101418]">admissions@nexora.eu</a></p>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[1px] text-[#101418]/45">Адрес</span>
                  <p className="mt-2 flex flex-col gap-1">
                    <a href="https://www.google.com/maps/search/?api=1&query=Schottengasse+4+1010+Wien" target="_blank" rel="noopener" className="hover-underline w-fit transition hover:text-[#101418]">Schottengasse 4, 1010 Wien</a>
                    <a href="https://www.google.com/maps/search/?api=1&query=Váci+utca+12+1052+Budapest" target="_blank" rel="noopener" className="hover-underline w-fit transition hover:text-[#101418]">Váci utca 12, 1052 Budapest</a>
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[1px] text-[#101418]/45">Часы</span>
                  <p className="mt-2 text-lg">Пн–Вс, 8:00–18:00</p>
                </div>
              </div>
            </div>
            </Reveal>
            <div className="h-px bg-white/10" />
            <Reveal>
            <div className="flex flex-col gap-5 text-[13px] text-[#101418]/50 lg:flex-row lg:items-center">
              <span>© 2026 Nexora Admissions. Правила приёма актуальны на сезон 2026/2027.</span>
            </div>
            </Reveal>
          </div>
        </footer>
      </div>
      <div data-footer-parallax-dark aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: (0.85 * (1 - sv)).toFixed(3), pointerEvents: "none", backgroundColor: "#F7F5EF" }} />
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Наверх"
        className="fixed bottom-24 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-[#101418]/10 bg-white/85 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 lg:bottom-8 lg:right-8 lg:flex"
        style={{ opacity: top ? 1 : 0, pointerEvents: top ? "auto" : "none" }}>
        <span aria-hidden><ArrowIcon className="h-5 w-5 -rotate-90 text-[#101418]" /></span>
      </button>
    </div>
  );
}
