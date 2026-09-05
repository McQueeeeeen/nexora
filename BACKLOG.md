# Лист ожидания

## Сделано
- [x] Форма: реальная отправка через FormSubmit + consent + honeypot + disabled
- [x] Privacy page + ссылка в футере + sitemap
- [x] vercel.json: security headers
- [x] error.tsx + global-error.tsx
- [x] Единая scroll-шина (ui.tsx)
- [x] Зафиксированные версии зависимостей
- [x] SafeImage с fallback
- [x] `pnpm test` — контракт data.ts (scripts/check-data.py)
- [x] Зерно off при reduced-motion
- [x] Hero распил (HeroMap + hero-anim.ts)

## Осталось
1. **FormSubmit: кликнуть активацию** из письма на admissions@nexora.eu, иначе заявки не дойдут. Затем тестовая заявка.
2. **Отзывы**: нужны реальные тексты (минимум +3). Не выдумываем.
3. **Домен** → metadataBase + canonical + абсолютный sitemap.
4. **Контент-аудит цифр** на сезон 2026/2027 (цены, дедлайны, QS, шансы).
5. **Lenis smooth scroll** — нужен Node (`pnpm add lenis` + провайдер).
6. **Мониторинг** — Sentry или хотя бы Vercel Analytics (нужен Node для lockfile).
7. **Отдельная страница отзывов** (опционально, как /reviews у эталона).
