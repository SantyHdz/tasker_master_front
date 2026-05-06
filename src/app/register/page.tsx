"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Completa todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await register(email, password, name);
      localStorage.setItem("token", data.access_token);
      document.cookie = `token=${data.access_token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el registro. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="bg-grid" />
      <div className="bg-gradient-orb top" />
      <div className="bg-gradient-orb bottom" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/login" className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors mb-6" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", marginBottom: "1.5rem", transition: "color var(--duration-base) ease" }}>
            <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al login
          </Link>
          <div
            className="mx-auto mb-4 fade-up"
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-light) 100%)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="var(--text-inverse)" strokeWidth="2"/>
              <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="var(--text-inverse)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="fade-up" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem", letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
            Crear cuenta
          </h1>
          <p className="fade-up text-muted" style={{ fontSize: "0.875rem" }}>
            Comienza a gestionar tus tareas hoy mismo
          </p>
        </div>

        {/* Card */}
        <div className="card-elevated fade-up" style={{ padding: "2rem" }}>
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="name" className="block text-sm text-muted mb-2" style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Nombre completo
              </label>
              <input
                id="name"
                className="input"
                type="text"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-2" style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Correo electrónico
              </label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-muted mb-2" style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Contraseña
              </label>
              <input
                id="password"
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="new-password"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm text-muted mb-2" style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Confirmar contraseña
              </label>
              <input
                id="confirm"
                className="input"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div
                className="fade-in"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--danger)",
                  background: "var(--danger-dim)",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                {error}
              </div>
            )}

            <button
              className="btn-primary fade-up"
              onClick={handleRegister}
              disabled={loading}
              style={{ marginTop: "0.5rem", padding: "0.875rem" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" style={{ width: "1rem", height: "1rem" }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Creando cuenta...
                </span>
              ) : (
                "Crear cuenta"
              )}
            </button>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center mt-6 text-sm text-dim" style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-muted" style={{ color: "var(--text-secondary)", transition: "color var(--duration-base) ease" }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
