"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { YB, useViewportProgress, Reveal, ArrowIcon, CheckIcon } from "./ui";

// Контакты + футер в параллакс-обёртке эталона.
// Форма из 2 шагов: дотсы, Continue, Email — как у эталона.
export default function Contact() {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [ref, p] = useViewportProgress<HTMLDivElement>();
  const pre = usePathname() === "/" ? "" : "/";

  return (
    <div ref={ref} data-footer-parallax style={{ position: "relative", overflow: "hidden" }}>
      <div data-footer-parallax-inner style={{ transform: `translateY(${(1 - p) * 90}px)`, willChange: "transform" }}>
        <footer id="contact" className="relative overflow-hidden bg-[#101418] px-4 pb-[76px] pt-16 lg:px-12 lg:pb-10 lg:pt-20">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(60% 45% at 85% 0%, rgba(94,234,212,0.12), transparent 70%), radial-gradient(50% 40% at 10% 100%, rgba(94,234,212,0.08), transparent 70%)" }} />
          <div className="relative mx-auto flex max-w-[1408px] flex-col gap-8">
            <div className="flex flex-col gap-[36px] lg:gap-12">
              <div className="border-b border-white/10 pb-6">
                <span className="font-mono text-base font-bold uppercase text-white/60">Контакты</span>
              </div>
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-5">
                <Reveal className="flex flex-col lg:flex-1">
                  <h3 className="text-[28px] font-normal leading-[1.05] tracking-[-1px] lg:text-[48px] lg:tracking-[-1.6px]">
                    Персональная стратегия за 15 минут
                  </h3>
                  <p className="mt-4 text-lg text-white/60 lg:text-xl">Оценим шансы на грант, проверим дедлайны и составим план поступления.</p>
                  <div className="mt-8 space-y-3 text-sm text-white/80">
                    <p><b>Вена:</b> Schottengasse 4, 1010 Wien</p>
                    <p><b>Будапешт:</b> Váci utca 12, 1052 Budapest</p>
                    <p><b>Telegram:</b> <a href="https://t.me/nexora_support" target="_blank" rel="noopener" className="underline" style={{ color: YB }}>@nexora_support</a></p>
                    <p><b>Email:</b> <a href="mailto:admissions@nexora.eu" className="underline break-all" style={{ color: YB }}>admissions@nexora.eu</a></p>
                    <p><b>На связи:</b> Пн–Вс, 8:00–18:00</p>
                  </div>
                </Reveal>
                <Reveal className="flex flex-col gap-5 lg:flex-1">
                  {sent ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                      <span style={{ color: YB }}><CheckIcon className="h-14 w-14" /></span>
                      <h4 className="mt-4 text-2xl font-medium">Заявка принята</h4>
                      <p className="mt-2 max-w-sm text-white/70">Свяжемся в течение 30 минут для бесплатной диагностики.</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
                      <div className="flex gap-1.5" aria-hidden>
                        {[0, 1].map((d) => (
                          <span key={d} className="h-1.5 rounded-full transition-all" style={d <= step ? { width: 32, background: YB } : { width: 8, background: "rgba(255,255,255,0.2)" }} />
                        ))}
                      </div>
                      {step === 0 ? (
                        <>
                          <div className="flex flex-col gap-5 lg:flex-row lg:gap-2.5">
                            <div className="flex flex-1 flex-col gap-2">
                              <label className="font-mono text-xs font-bold uppercase text-white/40">Ваше имя<span style={{ color: YB }}> *</span></label>
                              <input required placeholder="Иван Иванов" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                              <label className="font-mono text-xs font-bold uppercase text-white/40">Телефон<span style={{ color: YB }}> *</span></label>
                              <input required type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (999) 000-00-00" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase text-white/40">Email</label>
                            <input type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <button type="button" onClick={(e) => { const f = e.currentTarget.form; if (f && !f.reportValidity()) return; setStep(1); }} className="mp5-btn mp5-btn--primary w-full rounded-xl text-base" style={{ height: 56 }}>Продолжить</button>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase text-white/40">Страна и уровень</label>
                            <input placeholder="Например: Бакалавриат в Австрии" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-bold uppercase text-white/40">О себе (оценки, язык)</label>
                            <input placeholder="Например: GPA 4.5, английский B2" className="input-glow h-14 rounded-[10px] px-4 text-base" />
                          </div>
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(0)} className="mp5-btn mp5-btn--secondary flex items-center gap-2 rounded-xl px-6 text-base" style={{ height: 56 }}><ArrowIcon className="h-4 w-4 rotate-180" />Назад</button>
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
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="text-2xl font-bold text-white">NEXORA<span style={{ color: YB }}>.</span></div>
                <p className="mt-3 font-mono text-xs uppercase tracking-[2px] text-white/50">Study abroad. Start here.</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">Помогаем поступить в университеты Австрии и Венгрии: аудит, гранты, документы и ВНЖ под ключ.</p>
                <nav className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xl font-medium text-white/80">
                  <a href={`${pre}#services`} className="hover-underline transition hover:text-white">Программы</a>
                  <a href="/austria" className="hover-underline transition hover:text-white">Австрия</a>
                  <a href="/hungary" className="hover-underline transition hover:text-white">Венгрия</a>
                  <a href={`${pre}#faq`} className="hover-underline transition hover:text-white">FAQ</a>
                </nav>
              </div>
              <div className="flex flex-col gap-6 text-white/85">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[2px] text-white/40">Telegram</span>
                  <p className="mt-2"><a href="https://t.me/nexora_support" target="_blank" rel="noopener" className="hover-underline text-lg transition hover:text-white">@nexora_support</a></p>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[2px] text-white/40">Почта</span>
                  <p className="mt-2"><a href="mailto:admissions@nexora.eu" className="hover-underline break-all text-lg transition hover:text-white">admissions@nexora.eu</a></p>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[2px] text-white/40">Адрес</span>
                  <p className="mt-2 flex flex-col gap-1">
                    <a href="https://www.google.com/maps/search/?api=1&query=Schottengasse+4+1010+Wien" target="_blank" rel="noopener" className="hover-underline w-fit transition hover:text-white">Schottengasse 4, 1010 Wien</a>
                    <a href="https://www.google.com/maps/search/?api=1&query=Váci+utca+12+1052+Budapest" target="_blank" rel="noopener" className="hover-underline w-fit transition hover:text-white">Váci utca 12, 1052 Budapest</a>
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-[2px] text-white/40">Часы</span>
                  <p className="mt-2 text-lg">Пн–Вс, 8:00–18:00</p>
                </div>
              </div>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex flex-col gap-5 text-[13px] text-white/50 lg:flex-row lg:items-center">
              <span>© 2026 Nexora Admissions. Правила приёма актуальны на сезон 2026/2027.</span>
            </div>
          </div>
        </footer>
      </div>
      <div data-footer-parallax-dark aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: (1 - p) * 0.55, pointerEvents: "none", backgroundColor: "#0c0c0c" }} />
    </div>
  );
}
