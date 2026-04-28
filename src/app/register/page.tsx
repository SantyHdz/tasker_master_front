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
          <Link href="/login" className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al login
          </Link>
          <div
            className="mx-auto mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-2">Crear cuenta</h1>
          <p className="text-muted text-sm">
            Comienza a gestionar tus tareas hoy mismo
          </p>
        </div>

        {/* Card */}
        <div className="card fade-up" style={{ padding: "32px" }}>
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="name" className="block text-sm text-muted mb-2">
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
              <label htmlFor="email" className="block text-sm text-muted mb-2">
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
              <label htmlFor="password" className="block text-sm text-muted mb-2">
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
              <label htmlFor="confirm" className="block text-sm text-muted mb-2">
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
                  fontSize: "13px",
                  color: "var(--danger)",
                  background: "rgba(239,68,68,0.08)",
                  padding: "10px 12px",
                  borderRadius: "var(--radius-sm)",
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
              style={{ marginTop: "8px", padding: "14px" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
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
        <p className="text-center mt-6 text-sm text-dim">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-muted hover:text-text">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
