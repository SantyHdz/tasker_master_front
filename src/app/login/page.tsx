"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/api";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Completa todos los campos.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      document.cookie = `token=${data.access_token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      router.push("/dashboard");
    } catch {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
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
        <div className="text-center mb-8">
          <div
            className="mx-auto mb-6 fade-up"
            style={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-light) 100%)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="3" rx="1.5" fill="var(--text-inverse)"/>
              <rect x="3" y="10" width="13" height="3" rx="1.5" fill="var(--text-inverse)"/>
              <rect x="3" y="15" width="15" height="3" rx="1.5" fill="var(--text-inverse)"/>
            </svg>
          </div>
          <h1 className="fade-up" style={{ fontSize: "1.875rem", fontWeight: 600, marginBottom: "0.5rem", letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
            TaskerMaster
          </h1>
          <p className="fade-up text-muted" style={{ fontSize: "1rem" }}>
            Gestiona tus tareas con claridad y enfoque
          </p>
        </div>

        {/* Card */}
        <div className="card-elevated fade-up" style={{ padding: "2.25rem" }}>
          <div className="flex flex-col gap-4">
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
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div
                className="fade-in"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--danger)",
                  background: "var(--danger-dim)",
                  padding: "0.75rem 0.875rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                {error}
              </div>
            )}

            <button
              className="btn-primary fade-up"
              onClick={handleLogin}
              disabled={loading}
              style={{ marginTop: "0.5rem", padding: "0.875rem" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" style={{ width: "1rem", height: "1rem" }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Ingresando...
                </span>
              ) : (
                "Ingresar"
              )}
            </button>
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, var(--border-default), transparent)",
                marginBottom: "1rem",
              }}
            />
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-accent" style={{ color: "var(--accent-gold)" }}>
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center mt-6 text-sm text-dim" style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
          Al continuar, aceptas nuestros{" "}
          <Link href="/terminos" className="text-muted" style={{ color: "var(--text-secondary)", transition: "color var(--duration-base) ease" }}>Términos</Link> y{" "}
          <Link href="/privacidad" className="text-muted" style={{ color: "var(--text-secondary)", transition: "color var(--duration-base) ease" }}>Política de Privacidad</Link>
        </p>
      </div>
    </main>
  );
}
