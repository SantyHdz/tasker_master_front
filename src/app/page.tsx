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
      <nav className="relative z-10 glass" style={{ padding: "1rem 1.5rem", margin: "1rem", borderRadius: "var(--radius-xl)" }}>
        <div style={{ maxWidth: "75rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <div
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-light) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="3" rx="1.5" fill="var(--text-inverse)"/>
                <rect x="3" y="10" width="13" height="3" rx="1.5" fill="var(--text-inverse)"/>
                <rect x="3" y="15" width="15" height="3" rx="1.5" fill="var(--text-inverse)"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: "1.125rem", letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
              TaskerMaster
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href="/login" className="btn-ghost">
              Ingresar
            </Link>
            <Link href="/register" className="btn-primary">
              Empezar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10" style={{ padding: "5rem 1.5rem 2.5rem" }}>
        <div style={{ maxWidth: "56.25rem", margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div className="fade-up" style={{ marginBottom: "1.5rem" }}>
            <span className="badge badge-accent">
              Gestiona tus tareas con claridad
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fade-up"
            style={{
              fontSize: "clamp(2.25rem, 8vw, 4rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              letterSpacing: "-0.04em",
            }}
          >
            Organiza tu día,{"{"}
            <br />
            <span style={{ color: "var(--text-secondary)" }}>multiplica tu impacto{")"}</span>
          </h1>

          {/* Subheadline */}
          <p
            className="fade-up text-muted"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              maxWidth: "37.5rem",
              margin: "0 auto 2.5rem",
            }}
          >
            La forma más simple y elegante de gestionar tus tareas diarias.
            Sin complicaciones, sin distracciones. Solo tú y lo que importa.
          </p>

          {/* CTA Buttons */}
          <div
            className="fade-up flex items-center justify-center gap-3"
            style={{ marginBottom: "4rem" }}
          >
            <Link href="/register" className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "0.9375rem" }}>
              Comenzar gratis
            </Link>
            <Link
              href="#features"
              className="btn-secondary"
              style={{ padding: "0.875rem 2rem", fontSize: "0.9375rem" }}
            >
              Saber más
            </Link>
          </div>

          {/* Preview Card */}
          <div
            className="card-elevated fade-up"
            style={{
              maxWidth: "43.75rem",
              margin: "0 auto",
              padding: "0",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl), var(--shadow-gold)",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--border-default)",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                background: "var(--bg-secondary)",
              }}
            >
              <div style={{ display: "flex", gap: "0.375rem" }}>
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#28c840" }} />
              </div>
            </div>

            {/* Card content - Mock UI */}
            <div style={{ padding: "1.5rem" }}>
              {/* Task input mock */}
              <div
                className="glass"
                style={{
                  padding: "0.875rem 1rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div style={{ width: "1.125rem", height: "1.125rem", borderRadius: "var(--radius-sm)", border: "1.5px solid var(--border-default)" }} />
                <span className="text-dim" style={{ fontSize: "0.875rem" }}>Nueva tarea...</span>
              </div>

              {/* Task items mock */}
              {[
                { title: "Revisar correos pendientes", priority: "var(--text-tertiary)" },
                { title: "Preparar presentación para el equipo", priority: "var(--warning)" },
                { title: "Entregar reporte mensual", priority: "var(--danger)" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass fade-up"
                  style={{
                    padding: "0.875rem 1rem",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "0.625rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    animationDelay: `${150 + i * 50}ms`,
                  }}
                >
                  <div
                    style={{
                      width: "1.125rem",
                      height: "1.125rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1.5px solid var(--border-default)",
                    }}
                  />
                  <span style={{ flex: 1, fontSize: "0.875rem", color: "var(--text-primary)" }}>{item.title}</span>
                  <div
                    style={{
                      width: "0.5rem",
                      height: "0.5rem",
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
      <section id="features" style={{ padding: "6.25rem 1.5rem" }}>
        <div style={{ maxWidth: "62.5rem", margin: "0 auto" }}>
          <div className="text-center mb-8" style={{ marginBottom: "4rem" }}>
            <h2
              className="fade-up"
              style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "0.75rem" }}
            >
              Todo lo que necesitas,{" "}
              <span style={{ color: "var(--text-secondary)" }}>nada que sobre</span>
            </h2>
            <p className="fade-up text-muted" style={{ fontSize: "1rem", maxWidth: "31.25rem", margin: "0 auto" }}>
              Diseñado para ser simple pero poderoso. Las herramientas esenciales para mantener tu día bajo control.
            </p>
          </div>

          <div className="grid">
            {[
              {
                icon: (
                  <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v18M3 12h18"/>
                  </svg>
                ),
                title: "Crea tareas al instante",
                description: "Añade nuevas tareas con un solo clic. Sin formularios complejos, sin pasos innecesarios.",
                color: "var(--accent-gold)",
              },
              {
                icon: (
                  <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 15l8-8 8 8M4 9l8-8 8 8"/>
                  </svg>
                ),
                title: "Prioriza lo importante",
                description: "Marca tus tareas con prioridades. Enfócate en lo que realmente importa cada día.",
                color: "var(--warning)",
              },
              {
                icon: (
                  <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 7v5l3 3"/>
                  </svg>
                ),
                title: "Nunca pierdas el plazo",
                description: "Establece fechas límite y recibe recordatorios. Todo a tiempo, sin estrés.",
                color: "var(--info)",
              },
              {
                icon: (
                  <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                  <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                ),
                title: "Seguro y privado",
                description: "Tus datos están protegidos. Solo tú tienes acceso a tu lista de tareas.",
                color: "var(--text-primary)",
              },
              {
                icon: (
                  <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <path d="M12 18h.01"/>
                  </svg>
                ),
                title: "Siempre contigo",
                description: "Accede desde cualquier dispositivo. Tu lista te sigue dondequiera que vayas.",
                color: "var(--text-primary)",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card card-interactive fade-up"
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <div
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-default)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.125rem",
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                  {feature.title}
                </h3>
                <p className="text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div
          className="card-elevated fade-up"
          style={{
            maxWidth: "50rem",
            margin: "0 auto",
            padding: "4rem 2.5rem",
            textAlign: "center",
            background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-glass) 100%)",
            boxShadow: "var(--shadow-xl), var(--shadow-gold)",
          }}
        >
          <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
            ¿Listo para tomar el control?
          </h2>
          <p className="text-muted" style={{ fontSize: "1rem", marginBottom: "2rem", maxWidth: "31.25rem", margin: "0 auto 2rem" }}>
            Únete a TaskerMaster y transforma la forma en que gestionas tu día a día.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: "0.875rem 2.5rem", fontSize: "0.9375rem" }}>
            Comenzar ahora — es gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2.5rem 1.5rem", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "62.5rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "1.75rem",
                height: "1.75rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="3" rx="1.5" fill="var(--text-tertiary)"/>
                <rect x="3" y="10" width="13" height="3" rx="1.5" fill="var(--text-tertiary)"/>
                <rect x="3" y="15" width="15" height="3" rx="1.5" fill="var(--text-tertiary)"/>
              </svg>
            </div>
            <span className="text-dim" style={{ fontSize: "0.8125rem" }}>TaskerMaster © 2026</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacidad" className="text-dim" style={{ fontSize: "0.8125rem", transition: "color var(--duration-base) ease" }}>Privacidad</Link>
            <Link href="/terminos" className="text-dim" style={{ fontSize: "0.8125rem", transition: "color var(--duration-base) ease" }}>Términos</Link>
            <a href="#" className="text-dim" style={{ fontSize: "0.8125rem", transition: "color var(--duration-base) ease" }}>Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
