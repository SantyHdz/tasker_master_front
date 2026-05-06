"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPage() {
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
            Política de Privacidad
          </h1>
          <p className="text-muted" style={{ fontSize: "1rem", marginBottom: "2rem" }}>
            Última actualización: Mayo 2026
          </p>

          <div className="card-elevated" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  1. Información que Recopilamos
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  TaskerMaster recopila información que nos proporcionas directamente, incluyendo:
                </p>
                <ul style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)", paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                  <li>Nombre y dirección de correo electrónico al registrarte</li>
                  <li>Información de tareas que creas (títulos, descripciones, fechas)</li>
                  <li>Preferencias y configuraciones de tu cuenta</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  2. Cómo Usamos tu Información
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Utilizamos la información recopilada para:
                </p>
                <ul style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)", paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                  <li>Proporcionar, mantener y mejorar nuestros servicios</li>
                  <li>Procesar tus solicitudes y transacciones</li>
                  <li>Enviarte notificaciones relacionadas con tu cuenta</li>
                  <li>Responder a tus preguntas y comentarios</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  3. Seguridad de Datos
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  4. Compartición de Información
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  No vendemos, alquilamos ni compartimos tu información personal con terceros para sus fines de marketing. Solo podemos compartir tu información en las siguientes circunstancias:
                </p>
                <ul style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)", paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                  <li>Con tu consentimiento explícito</li>
                  <li>Para cumplir con obligaciones legales</li>
                  <li>Para proteger nuestros derechos, propiedad o seguridad</li>
                  <li>Con proveedores de servicios que nos ayudan a operar el servicio</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  5. Tus Derechos
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Tienes derecho a:
                </p>
                <ul style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)", paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                  <li>Acceder a tu información personal</li>
                  <li>Corregir información inexacta</li>
                  <li>Solicitar la eliminación de tu información</li>
                  <li>Oponerte al procesamiento de tu información</li>
                  <li>Retirar tu consentimiento en cualquier momento</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  6. Retención de Datos
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Conservamos tu información personal solo durante el tiempo necesario para cumplir con los fines descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  7. Cambios a esta Política
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Podemos actualizar esta política de privacidad de vez en cuando. Te notificaremos sobre cualquier cambio significativo publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                  8. Contacto
                </h2>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  Si tienes alguna pregunta sobre esta política de privacidad o sobre el manejo de tu información personal, por favor contáctanos a través de los canales disponibles en nuestra plataforma.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
