import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "TaskerMaster | Organiza tu día, multiplica tu impacto",
  description:
    "La forma más simple y elegante de gestionar tus tareas diarias. Sin complicaciones, sin distracciones. Solo tú y lo que importa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body>
        <div style={{ position: "relative", minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}