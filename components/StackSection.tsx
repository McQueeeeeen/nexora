"use client";
import { useEffect, useRef } from "react";
import { onRafScroll } from "./ui";

interface StackSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  scaleExit?: boolean;
}

// Карточный стек: при уходе секции вверх она плавно масштабируется (scale 1.0 → 0.93),
// слегка затемняется и скругляет нижние углы, пока следующая секция со скруглённым
// верхом плавно наплывает поверх неё. Ноль ре-рендеров React при скролле.
export default function StackSection({
  children,
  className = "",
  id,
  scaleExit = true,
}: StackSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scaleExit || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let lastS = -1;
    return onRafScroll(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Когда верх секции уходит за верхний край экрана (r.top < 0)
      if (r.top < 0 && r.bottom > 0) {
        const exitProgress = Math.min(1, Math.abs(r.top) / (vh * 1.1));
        const scale = 1 - exitProgress * 0.065;
        const opacity = 1 - exitProgress * 0.32;
        const rounded = exitProgress * 28;

        if (Math.abs(scale - lastS) < 0.001) return;
        lastS = scale;

        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.borderRadius = `0 0 ${rounded.toFixed(1)}px ${rounded.toFixed(1)}px`;
        el.style.transformOrigin = "center top";
      } else if (r.top >= 0 && lastS !== 1) {
        lastS = 1;
        el.style.transform = "none";
        el.style.opacity = "1";
        el.style.borderRadius = "0";
      }
    });
  }, [scaleExit]);

  return (
    <div
      ref={ref}
      id={id}
      className={`relative z-10 w-full ${className}`}
      style={{ willChange: scaleExit ? "transform, opacity" : undefined }}
    >
      {children}
    </div>
  );
}
