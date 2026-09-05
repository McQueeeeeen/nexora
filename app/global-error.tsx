"use client";

import { Btn } from "../components/ui";

// Последний рубеж: падение корневого layout.
export default function GlobalError() {
  return (
    <html lang="ru">
      <body style={{ margin: 0, background: "#F7F5EF", color: "#101418", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <h1 style={{ fontSize: 40 }}>Что-то пошло не так</h1>
          <p style={{ opacity: 0.6 }}>Обновите страницу или вернитесь на главную.</p>
          <div style={{ marginTop: 24 }}>
            <Btn href="/" className="h-14 rounded-xl px-8 text-base">На главную</Btn>
          </div>
        </main>
      </body>
    </html>
  );
}
