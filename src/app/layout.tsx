import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tasker Master | Organiza tu día, multiplica tu impacto",
  description: "La forma más simple y elegante de gestionar tus tareas diarias. Sin complicaciones, sin distracciones. Solo tú y lo que importa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div style={{ position: "relative", minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
