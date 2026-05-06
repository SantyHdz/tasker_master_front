"use client";

import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="bg-grid" />
      <div className="bg-gradient-orb top" />
      <div className="bg-gradient-orb bottom" />

      {/* Content */}
      <div className="relative z-10" style={{ maxWidth: "48rem", margin: "0 auto", padding: "6rem 1.5rem" }}>
        <div className="fade-up">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="btn-ghost"
            style={{ marginBottom: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver
          </button>

          <h1 style={{ fontSize: "2.5rem", fontWeight: 600, marginBottom: "1rem", letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
            Términos de Servicio
          </h1>
          <p className="text-muted" style={{ fontSize: "1rem", marginBottom: "2rem" }}>
            Última actualización: Mayo 2026
          </p>

          <div className="card-elevated" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  1. Aceptación de Términos
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Al acceder y utilizar TaskerMaster, aceptas cumplir con estos términos de servicio y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, tienes prohibido usar o acceder a este sitio.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  2. Uso del Servicio
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  TaskerMaster es una plataforma de gestión de tareas personales. Te comprometes a utilizar el servicio solo para fines legítimos y de acuerdo con estos términos. No debes:
                </p>
                <ul style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)", paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                  <li>Utilizar el servicio para cualquier propósito ilegal o no autorizado</li>
                  <li>Violar cualquier ley internacional, federal, provincial o local</li>
                  <li>Infringir derechos de propiedad intelectual</li>
                  <li>Transmitir cualquier material que sea dañino, ofensivo o indecente</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  3. Cuentas de Usuario
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Para utilizar ciertas funciones del servicio, debes registrarte y crear una cuenta. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Eres responsable de todas las actividades que ocurran en tu cuenta.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  4. Propiedad Intelectual
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Todo el contenido, características y funcionalidad de TaskerMaster son propiedad exclusiva de sus respectivos dueños y están protegidos por leyes de derechos de autor, marcas registradas y otras leyes de propiedad intelectual.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  5. Limitación de Responsabilidad
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  En ningún caso TaskerMaster será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo但不限于 pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  6. Modificaciones del Servicio
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento sin previo aviso. No seremos responsables ante ti ni ante ningún tercero por cualquier modificación, cambio de precio, suspensión o discontinuación del servicio.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  7. Contacto
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Si tienes alguna pregunta sobre estos términos, por favor contáctanos a través de los canales disponibles en nuestra plataforma.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
