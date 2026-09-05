import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Nexora Admissions — Австрия и Венгрия", description: "Поступление в университеты Австрии и Венгрии" };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ru"><body>{children}</body></html>; }
