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
            className="mx-auto mb-6 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
              boxShadow: "0 0 40px var(--accent-glow)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="3" rx="1.5" fill="#0a0a0c"/>
              <rect x="3" y="10" width="13" height="3" rx="1.5" fill="#0a0a0c"/>
              <rect x="3" y="15" width="15" height="3" rx="1.5" fill="#0a0a0c"/>
            </svg>
          </div>
          <h1 className="text-3xl font-semibold mb-2">Tasker Master</h1>
          <p className="text-muted text-base">
            Gestiona tus tareas con claridad y enfoque
          </p>
        </div>

        {/* Card */}
        <div className="card fade-up" style={{ padding: "36px" }}>
          <div className="flex flex-col gap-4">
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
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div
                className="fade-in"
                style={{
                  fontSize: "13px",
                  color: "var(--danger)",
                  background: "rgba(239,68,68,0.08)",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-sm)",
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
              style={{ marginTop: "8px", padding: "14px" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
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

          <div className="mt-6 text-center">
            <div
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, var(--border), transparent)",
                marginBottom: "16px",
              }}
            />
            <p className="text-sm text-muted">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-accent hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center mt-6 text-sm text-dim">
          Al continuar, aceptas nuestros{" "}
          <a href="#" className="text-muted hover:text-text">Términos</a> y{" "}
          <a href="#" className="text-muted hover:text-text">Política de Privacidad</a>
        </p>
      </div>
    </main>
  );
}
