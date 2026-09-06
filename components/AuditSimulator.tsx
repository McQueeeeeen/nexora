"use client";
import { useState, useEffect } from "react";
import { wrap, Tag, Reveal, Btn, CheckIcon, ArrowIcon } from "./ui";

const steps = [
  {
    id: "01",
    tag: "Этап 01",
    title: "Академический аудит",
    desc: "Сканируем оценки, языковой уровень и рассчитываем академическую разницу для университетов Австрии и Венгрии.",
    badge: "Сканирование документов",
  },
  {
    id: "02",
    tag: "Этап 02",
    title: "Скоринг грантов и шансов",
    desc: "Алгоритм сопоставляет профиль с критериями отбора Stipendium Hungaricum, WU Vienna, TU Wien и ELTE.",
    badge: "Расчёт бюджета и стипендий",
  },
  {
    id: "03",
    tag: "Этап 03",
    title: "Шортлист и стратегия",
    desc: "Формируем персональный портфель из 3–5 программ: от флагманских до 100% гарантированных вариантов.",
    badge: "Гарантия зачисления",
  },
];

export default function AuditSimulator() {
  const [activeTab, setActiveTab] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <section className="w-full bg-[#FBF9F5] py-[clamp(4rem,6.25vw,7.5rem)] border-b border-[#2A211D]/10">
      <div className={wrap}>
        {/* Заголовок секции */}
        <Reveal className="flex flex-col items-start gap-4">
          <Tag>Интерактивная система</Tag>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end w-full">
            <div>
              <h2 className="text-balance text-[clamp(2rem,3.2vw,3.75rem)] font-medium leading-[1.08] tracking-tight text-[#2A211D] max-w-[840px]">
                Не просто консультируем. Рассчитываем точные шансы на зачисление.
              </h2>
              <p className="mt-4 max-w-[620px] text-base leading-relaxed text-[#2A211D]/70 lg:text-lg">
                Наша методология исключает отказы: детальный аудит профиля превращает поступление в прозрачный математический процесс.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C88242] bg-[#C88242]/10 px-3 py-1.5 rounded-full border border-[#C88242]/20">
                Live Simulation
              </span>
            </div>
          </div>
        </Reveal>

        {/* Интерактивная витрина / Симулятор */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Левая колонка: интерактивные шаги */}
          <div className="flex flex-col gap-4 lg:col-span-6">
            {steps.map((s, i) => {
              const isActive = activeTab === i;
              return (
                <Reveal key={s.id} delay={i * 80}>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoPlay(false);
                      setActiveTab(i);
                    }}
                    className={`w-full text-left rounded-2xl p-6 lg:p-7 transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? "bg-[#120D0B] text-[#FBF9F5] border-[#C88242]/40 shadow-xl"
                        : "bg-white text-[#2A211D] border-[#2A211D]/10 hover:border-[#C88242]/30 hover:bg-white/90"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                          isActive ? "text-[#E5B87A]" : "text-[#786C64]"
                        }`}
                      >
                        {s.tag}
                      </span>
                      <span
                        className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${
                          isActive
                            ? "bg-[#C88242]/20 border-[#C88242]/40 text-[#E5B87A]"
                            : "bg-[#2A211D]/5 border-[#2A211D]/10 text-[#2A211D]/60"
                        }`}
                      >
                        {s.badge}
                      </span>
                    </div>
                    <h3 className={`mt-3 text-xl lg:text-2xl font-medium tracking-tight ${isActive ? "text-[#FBF9F5]" : "text-[#2A211D]"}`}>
                      {s.title}
                    </h3>
                    <p className={`mt-2 text-sm lg:text-base leading-relaxed ${isActive ? "text-[#FBF9F5]/75" : "text-[#2A211D]/65"}`}>
                      {s.desc}
                    </p>
                  </button>
                </Reveal>
              );
            })}
            <div className="pt-2">
              <Btn href="#contact" className="h-14 rounded-xl px-8 text-base">
                Получить аудит профиля (€10)
              </Btn>
            </div>
          </div>

          {/* Правая колонка: живой мокап устройства с симуляцией */}
          <Reveal className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[9/17.5] rounded-[2.8rem] bg-[#0E0B09] p-3 shadow-[0_24px_70px_rgba(18,13,11,0.35)] border-[3px] border-[#2A211D]/30 ring-1 ring-white/15 overflow-hidden select-none">
              {/* Dynamic Island / Верхний вырез */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 h-6 w-28 rounded-full bg-black flex items-center justify-between px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1A1412] flex items-center justify-center">
                  <span className="h-1 w-1 rounded-full bg-[#2A211D]" />
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#C88242]/40 animate-pulse" />
              </div>

              {/* Экран устройства */}
              <div className="relative h-full w-full rounded-[2.2rem] bg-[#140F0D] overflow-hidden flex flex-col justify-between p-5 pt-12 text-white">
                {/* Верхняя статусная панель мокапа */}
                <div className="flex items-center justify-between z-20">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 border border-white/10">
                    <span className="h-2 w-2 rounded-full bg-[#34C759] animate-ping" />
                    <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white/90">
                      Nexora Core AI
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#E5B87A] font-semibold tracking-wider">
                    {activeTab === 0 ? "SCANNING" : activeTab === 1 ? "SCORING" : "MATCHED"}
                  </span>
                </div>

                {/* Центральное интерактивное окно в зависимости от таба */}
                <div className="relative flex-1 my-4 rounded-2xl bg-[#1A1412] border border-white/10 overflow-hidden flex flex-col justify-center p-4">
                  {/* Фоновая сетка сканера */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: "radial-gradient(#C88242 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {activeTab === 0 && (
                    <div className="relative z-10 flex flex-col gap-3">
                      {/* Лазерный луч сканирования */}
                      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E5B87A] to-transparent shadow-[0_0_12px_#E5B87A] animate-bounce" style={{ top: "45%" }} />

                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-mono text-[11px] text-white/60">Документ</span>
                        <span className="font-mono text-[11px] text-[#E5B87A] font-semibold">Аттестат + IELTS</span>
                      </div>

                      {/* Обнаруженные параметры с плавающими бейджами */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-md p-2.5 border border-white/10">
                          <span className="text-xs text-white/85">Средний балл (GPA)</span>
                          <span className="font-mono text-xs font-bold text-[#E5B87A]">4.8 / 5.0</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-md p-2.5 border border-white/10">
                          <span className="text-xs text-white/85">Английский язык</span>
                          <span className="font-mono text-xs font-bold text-[#34C759]">IELTS 7.5 (C1)</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-md p-2.5 border border-white/10">
                          <span className="text-xs text-white/85">Немецкий язык</span>
                          <span className="font-mono text-xs font-bold text-white/70">A1 (VWU с нуля)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-mono text-[11px] text-white/60">Вероятность зачисления</span>
                        <span className="font-mono text-[11px] text-[#34C759] font-semibold">98.4% Шанс</span>
                      </div>

                      <div className="space-y-2.5">
                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-white/80">Stipendium Hungaricum (Грант 100%)</span>
                            <span className="font-mono text-[#E5B87A]">94%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#C88242] to-[#E5B87A] rounded-full" style={{ width: "94%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-white/80">Госуниверситеты Австрии (€726/сем)</span>
                            <span className="font-mono text-[#34C759]">99%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#34C759] rounded-full" style={{ width: "99%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-white/80">Студенческий ВНЖ (Без отказа)</span>
                            <span className="font-mono text-[#E5B87A]">100%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#C88242] to-[#E5B87A] rounded-full" style={{ width: "100%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 2 && (
                    <div className="relative z-10 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                        <span className="font-mono text-[11px] text-white/60">Рекомендованные вузы</span>
                        <span className="font-mono text-[11px] text-[#E5B87A]">3 программы</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="rounded-lg bg-white/10 backdrop-blur-sm p-2 border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="block text-xs font-semibold text-white">University of Vienna</span>
                            <span className="font-mono text-[10px] text-white/60">CS & Data · Вена</span>
                          </div>
                          <span className="font-mono text-[11px] font-bold text-[#34C759]">Топ-выбор</span>
                        </div>

                        <div className="rounded-lg bg-white/10 backdrop-blur-sm p-2 border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="block text-xs font-semibold text-white">ELTE University</span>
                            <span className="font-mono text-[10px] text-white/60">Computer Science · Грант</span>
                          </div>
                          <span className="font-mono text-[11px] font-bold text-[#E5B87A]">100% Грант</span>
                        </div>

                        <div className="rounded-lg bg-white/10 backdrop-blur-sm p-2 border border-white/10 flex items-center justify-between">
                          <div>
                            <span className="block text-xs font-semibold text-white">WU Vienna</span>
                            <span className="font-mono text-[10px] text-white/60">Business (BBE) · Вена</span>
                          </div>
                          <span className="font-mono text-[11px] font-bold text-white/80">Прямой приём</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Нижняя карточка с результатом и CTA в мокапе */}
                <div className="rounded-xl bg-white/10 backdrop-blur-md p-3.5 border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-medium text-white">Готовы к разбору?</span>
                    <span className="font-mono text-[10px] text-white/60">Консультация эксперта за 15 мин</span>
                  </div>
                  <span className="h-8 w-8 rounded-full bg-[#E5B87A] text-[#120D0B] flex items-center justify-center font-bold text-sm shadow-md">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
