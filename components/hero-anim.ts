// Именованные константы и формулы скролл-анимаций.
// Дословно повторяют тайминги и кривые эталона: слот фразы e=0.92/N, power2/3.

export const easeOut2 = (x: number) => 1 - (1 - x) * (1 - x);
export const easeOut3 = (x: number) => 1 - (1 - x) * (1 - x) * (1 - x);
export const easeIn2 = (x: number) => x * x;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Разбивка текста на слова; одиночный пробел — отдельный элемент.
 *  Пробелы рендерятся как nbsp, слова — в nowrap-обёртках: переносы
 *  только между словами, никогда внутри. */
export function splitWords(text: string): string[][] {
  const words: string[][] = [];
  let acc: string[] = [];
  text.split("").forEach((ch) => {
    if (ch === " ") {
      if (acc.length) { words.push(acc); acc = []; }
      words.push([" "]);
    } else acc.push(ch);
  });
  if (acc.length) words.push(acc);
  return words;
}

export interface HeroCharMeta { l: number; j: number; C: number; last: boolean }

/** Плоские метаданные символов hero-фраз в порядке DOM. */
export function buildHeroMetas(phrases: { t: string }[]): HeroCharMeta[] {
  const metas: HeroCharMeta[] = [];
  const N = phrases.length;
  phrases.forEach((ph, l) => {
    const C = ph.t.length;
    let gi = 0;
    splitWords(ph.t).forEach((w) => {
      if (w.length === 1 && w[0] === " ") metas.push({ l, j: gi++, C, last: l === N - 1 });
      else w.forEach(() => { metas.push({ l, j: gi++, C, last: l === N - 1 }); });
    });
  });
  return metas;
}

// Плавный цветовой переход: тёплый золотой/янтарный #FFE533 / #E5B87A → чистый белый #FFFFFF
export const mixLight = (t: number) => {
  const r = Math.round(235 + (255 - 235) * t);
  const g = Math.round(195 + (255 - 195) * t);
  const b = Math.round(125 + (255 - 125) * t);
  return `rgb(${r},${g},${b})`;
};

/** Стиль одного символа hero-фразы в момент scrub-времени. */
export function heroCharStyle(
  time: number, m: HeroCharMeta, total: number, _light = true,
): { opacity: string; color: string; textShadow: string } {
  const e = 0.92 / total;
  const I = 0.55 * e, S = 0.2 * e, F = 0.25 * e;
  const isFirst = m.l === 0;
  const h = isFirst ? 0 : 0.04 + m.l * e;
  const pd = (0.5 * I) / m.C;
  const fd = F / m.C;
  const oIn = isFirst ? 1 : easeOut2(clamp01((time - (h + m.j * pd)) / (8 * pd)));
  const cT = isFirst ? 1 : easeOut3(clamp01((time - (h + 3 * pd + m.j * pd)) / (14 * pd)));
  const oOut = !m.last ? easeIn2(clamp01((time - (h + I + S + m.j * fd)) / (4 * fd))) : 0;
  const op = oIn * (1 - oOut);
  const glowing = op > 0.05 && cT < 0.7;
  const shadow = glowing
    ? "0 0 18px rgba(229,184,122,0.85), 0 0 32px rgba(200,130,66,0.5)"
    : "0 2px 24px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.6)";
  return {
    opacity: op < 0.01 ? "0" : op.toFixed(3),
    color: mixLight(cT),
    textShadow: shadow,
  };
}

