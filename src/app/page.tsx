"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="bg-grid" />
      <div className="bg-gradient-orb top" />
      <div className="bg-gradient-orb bottom" />

      {/* Navigation */}
      <nav className="relative z-10" style={{ padding: "20px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 25px var(--accent-glow)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="3" rx="1.5" fill="#0a0a0c"/>
                <rect x="3" y="10" width="13" height="3" rx="1.5" fill="#0a0a0c"/>
                <rect x="3" y="15" width="15" height="3" rx="1.5" fill="#0a0a0c"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: "18px", letterSpacing: "-0.02em" }}>Tasker Master</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/login" className="btn-ghost" style={{ fontSize: "14px" }}>
              Ingresar
            </Link>
            <Link href="/register" className="btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
              Empezar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10" style={{ padding: "80px 24px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div className="fade-up" style={{ marginBottom: "24px" }}>
            <span
              className="badge badge-accent"
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                background: "var(--accent-dim)",
                border: "1px solid rgba(249, 115, 22, 0.2)",
              }}
            >
              Gestiona tus tareas con claridad
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fade-up"
            style={{
              fontSize: "clamp(36px, 8vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: "20px",
              letterSpacing: "-0.04em",
            }}
          >
            Organiza tu día,{"{"}
            <br />
            <span style={{ color: "var(--text-muted)" }}>multiplica tu impacto{")"}</span>
          </h1>

          {/* Subheadline */}
          <p
            className="fade-up text-muted"
            style={{
              fontSize: "clamp(16px, 3vw, 20px)",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            La forma más simple y elegante de gestionar tus tareas diarias.
            Sin complicaciones, sin distracciones. Solo tú y lo que importa.
          </p>

          {/* CTA Buttons */}
          <div
            className="fade-up flex items-center justify-center gap-3"
            style={{ marginBottom: "64px" }}
          >
            <Link href="/register" className="btn-primary" style={{ padding: "14px 32px", fontSize: "15px" }}>
              Comenzar gratis
            </Link>
            <Link
              href="#features"
              className="btn-secondary"
              style={{ padding: "14px 32px", fontSize: "15px" }}
            >
              Saber más
            </Link>
          </div>

          {/* Preview Card */}
          <div
            className="card-elevated fade-up"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              padding: "0",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg), 0 0 60px rgba(249, 115, 22, 0.1)",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840" }} />
              </div>
            </div>

            {/* Card content - Mock UI */}
            <div style={{ padding: "24px" }}>
              {/* Task input mock */}
              <div
                style={{
                  padding: "14px 16px",
                  background: "var(--bg)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div style={{ width: "18px", height: "18px", borderRadius: "5px", border: "1.5px solid var(--border)" }} />
                <span className="text-dim" style={{ fontSize: "14px" }}>Nueva tarea...</span>
              </div>

              {/* Task items mock */}
              {[
                { title: "Revisar correos pendientes", priority: "var(--text-muted)" },
                { title: "Preparar presentación para el equipo", priority: "#fbbf24" },
                { title: "Entregar reporte mensual", priority: "var(--danger)" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="fade-up"
                  style={{
                    padding: "14px 16px",
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    animationDelay: `${150 + i * 50}ms`,
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "5px",
                      border: "1.5px solid var(--border)",
                    }}
                  />
                  <span style={{ flex: 1, fontSize: "14px" }}>{item.title}</span>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: item.priority,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="text-center mb-8" style={{ marginBottom: "64px" }}>
            <h2
              className="fade-up"
              style={{ fontSize: "32px", fontWeight: 600, marginBottom: "12px" }}
            >
              Todo lo que necesitas,{" "}
              <span style={{ color: "var(--text-muted)" }}>nada que sobre</span>
            </h2>
            <p className="fade-up text-muted" style={{ fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
              Diseñado para ser simple pero poderoso. Las herramientas esenciales para mantener tu día bajo control.
            </p>
          </div>

          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v18M3 12h18"/>
                  </svg>
                ),
                title: "Crea tareas al instante",
                description: "Añade nuevas tareas con un solo clic. Sin formularios complejos, sin pasos innecesarios.",
                color: "var(--accent)",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 15l8-8 8 8M4 9l8-8 8 8"/>
                  </svg>
                ),
                title: "Prioriza lo importante",
                description: "Marca tus tareas con prioridades. Enfócate en lo que realmente importa cada día.",
                color: "#fbbf24",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 7v5l3 3"/>
                  </svg>
                ),
                title: "Nunca pierdas el plazo",
                description: "Establece fechas límite y recibe recordatorios. Todo a tiempo, sin estrés.",
                color: "var(--primary)",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                ),
                title: "Marca y sigue avanzando",
                description: "Completa tareas y observa tu progreso. La satisfacción de tachar cosas de tu lista.",
                color: "var(--success)",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                ),
                title: "Seguro y privado",
                description: "Tus datos están protegidos. Solo tú tienes acceso a tu lista de tareas.",
                color: "var(--text)",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <path d="M12 18h.01"/>
                  </svg>
                ),
                title: "Siempre contigo",
                description: "Accede desde cualquier dispositivo. Tu lista te sigue dondequiera que vayas.",
                color: "var(--text)",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card fade-up"
                style={{
                  padding: "28px",
                  transition: "all 0.3s ease",
                  animationDelay: `${i * 50}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
                  {feature.title}
                </h3>
                <p className="text-muted" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 24px" }}>
        <div
          className="card-elevated fade-up"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "64px 40px",
            textAlign: "center",
            background: "linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-card) 100%)",
            border: "1px solid var(--border)",
          }}
        >
          <h2 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "12px" }}>
            ¿Listo para tomar el control?
          </h2>
          <p className="text-muted" style={{ fontSize: "16px", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
            Únete a Tasker Master y transforma la forma en que gestionas tu día a día.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: "14px 40px", fontSize: "15px" }}>
            Comenzar ahora — es gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 24px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: "var(--bg-hover)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="3" rx="1.5" fill="var(--text-dim)"/>
                <rect x="3" y="10" width="13" height="3" rx="1.5" fill="var(--text-dim)"/>
                <rect x="3" y="15" width="15" height="3" rx="1.5" fill="var(--text-dim)"/>
              </svg>
            </div>
            <span className="text-dim" style={{ fontSize: "13px" }}>Tasker Master © 2026</span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="#" className="text-dim hover:text-text" style={{ fontSize: "13px" }}>Privacidad</a>
            <a href="#" className="text-dim hover:text-text" style={{ fontSize: "13px" }}>Términos</a>
            <a href="#" className="text-dim hover:text-text" style={{ fontSize: "13px" }}>Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
