import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Единая типографическая система:
// 1. Manrope (основной) — чистый швейцарский геометрический гротеск для заголовков, меню и основного текста
// 2. JetBrains Mono (дополнительный) — технологичный моноширинный шрифт для тегов, дат, бейджей и номеров
const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexora-eight-opal.vercel.app"),
  alternates: { canonical: "/" },
  title: "Nexora Admissions — поступление в вузы Австрии и Венгрии",
  description:
    "Академический аудит, гранты Stipendium Hungaricum и OeAD, зачисление в университеты Вены и Будапешта без риска отказа. Персональная стратегия поступления за 15 минут.",
  keywords: [
    "поступление в Австрию", "университеты Австрии", "учеба в Венгрии",
    "Stipendium Hungaricum", "гранты на обучение в Европе", "студенческий ВНЖ Австрия",
    "University of Vienna", "TU Wien", "ELTE", "Corvinus", "нострификация диплома",
  ],
  authors: [{ name: "Nexora Admissions" }],
  openGraph: {
    title: "Nexora Admissions — поступление в вузы Австрии и Венгрии",
    description:
      "Аудит, гранты Stipendium Hungaricum, зачисление в University of Vienna, TU Wien, ELTE и Corvinus. Стратегия поступления за 15 минут.",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Кампус европейского университета — поступление с Nexora",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#120D0B" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Nexora Admissions",
  url: "https://nexora-eight-opal.vercel.app",
  logo: "https://nexora-eight-opal.vercel.app/icon.svg",
  description: "Академический аудит, гранты Stipendium Hungaricum и OeAD, зачисление в университеты Вены и Будапешта без риска отказа.",
  email: "admissions@nexora.eu",
  sameAs: ["https://t.me/nexora_support"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "AT",
    addressLocality: "Vienna",
  },
};

import SmoothScroll from "../components/SmoothScroll";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
