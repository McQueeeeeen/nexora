import React, { useEffect, useState } from 'react';

interface HeroAnimatedTitleProps {
  text: string;
}

export const HeroAnimatedTitle: React.FC<HeroAnimatedTitleProps> = ({ text }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, window.scrollY / total));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textLength = text.length;

  return (
    <h1 className="mt-7 max-w-[1100px] font-inter text-[clamp(34px,6.8vw,80px)] font-normal leading-[1.04] tracking-[-0.03em] text-white">
      {text.split('').map((char, i) => {
        const letterProgress = Math.max(0, Math.min(1, progress * textLength - i));
        const opacity = Math.min(1, Math.max(0, letterProgress));
        const color = letterProgress > 0.5 ? '#FFFFFF' : '#FFE533';
        return (
          <span key={i} style={{ opacity, color, transition: 'opacity 0.2s, color 0.2s' }}>
            {char}
          </span>
        );
      })}
    </h1>
  );
};
