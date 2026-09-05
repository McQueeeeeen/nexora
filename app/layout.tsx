import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
