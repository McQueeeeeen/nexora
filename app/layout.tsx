import type { Metadata, Viewport } from "next";
import { Onest, Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// Onest: гротеск с кириллицей (Geist её не имеет — русский сыпался в системный).
const sans = Onest({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const mono = Roboto_Mono({ subsets: ["latin", "cyrillic"], weight: ["500", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
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
  themeColor: "#0C0C0C",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>{children}<Analytics /></body>
    </html>
  );
}
