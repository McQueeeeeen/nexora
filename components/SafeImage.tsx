"use client";

import { useState } from "react";

// Картинка с заглушкой: битый URL больше не оставляет дыру в вёрстке.
export default function SafeImage({ src, alt, className = "", eager = false }: {
  src: string; alt: string; className?: string; eager?: boolean;
}) {
  const [dead, setDead] = useState(false);
  if (dead) {
    return <div aria-hidden className={`bg-[#2A211D]/5 ${className}`} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
      onError={() => setDead(true)}
      className={className}
    />
  );
}
