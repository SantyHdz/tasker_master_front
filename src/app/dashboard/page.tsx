"use client";

import { useEffect, useState, useCallback } from "react";
import { getTasks, completeTask } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import CreateTask from "@/components/CreateTask";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority_id?: number;
  completed?: boolean;
}

const PRIORITY_MAP: Record<number, { label: string; className: string; color: string }> = {
  1: { label: "Baja", className: "badge-muted", color: "var(--text-muted)" },
  2: { label: "Media", className: "badge-warning", color: "#fbbf24" },
  3: { label: "Alta", className: "badge-danger", color: "var(--danger)" },
};

function formatDate(date: string) {
  const d = new Date(date);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const isTomorrow = d.toDateString() === new Date(now.getTime() + 86400000).toDateString();

  if (isToday) return `Hoy, ${d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`;
  if (isTomorrow) return `Mañana, ${d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`;
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function getRelativeTimeClass(date: string) {
  const d = new Date(date);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  const hoursLeft = diff / (1000 * 60 * 60);

  if (hoursLeft < 0) return "var(--danger)";
  if (hoursLeft < 24) return "var(--warning)";
  return "var(--text-muted)";
}

export default function Dashboard() {
  useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const fetchTasks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch {
      setError("No se pudieron cargar las tareas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleComplete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await completeTask(token, id);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/login";
  };

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  const filteredTasks = filter === "pending" ? pending : filter === "completed" ? completed : tasks;

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="bg-grid" />
      <div className="bg-gradient-orb top" />

      {/* Top bar */}
      <header
        className="sticky top-0 z-50"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(10,10,12,0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "inherit" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px var(--accent-glow)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="3" rx="1.5" fill="#0a0a0c"/>
                  <rect x="3" y="10" width="13" height="3" rx="1.5" fill="#0a0a0c"/>
                  <rect x="3" y="15" width="15" height="3" rx="1.5" fill="#0a0a0c"/>
                </svg>
              </div>
              <span style={{ fontWeight: 600, fontSize: "16px", letterSpacing: "-0.02em" }}>Tasker Master</span>
            </Link>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Stats */}
              <div
                className="flex items-center gap-3"
                style={{
                  padding: "8px 14px",
                  borderRadius: "100px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--accent)" }}>{pending.length}</strong> pendiente{pending.length !== 1 ? "s" : ""}
                </span>
                <span style={{ width: "1px", height: "14px", background: "var(--border)" }} />
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--success)" }}>{completed.length}</strong> completada{completed.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* User menu */}
              <button
                className="btn-ghost"
                onClick={handleLogout}
                style={{
                  padding: "8px 14px",
                  fontSize: "13px",
                  border: "1px solid var(--border)",
                }}
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Header */}
        <div className="fade-up" style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.03em" }}>
            Tus tareas
          </h1>
          <p className="text-muted" style={{ fontSize: "15px" }}>
            {new Date().toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Create task */}
        <CreateTask refresh={fetchTasks} />

        {/* Error */}
        {error && (
          <div
            className="card fade-in mb-4"
            style={{
              borderColor: "rgba(239,68,68,0.3)",
              background: "rgba(239,68,68,0.05)",
            }}
          >
            <p style={{ color: "var(--danger)", fontSize: "14px" }}>{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-6 fade-up" style={{ animationDelay: "100ms" }}>
          {[
            { key: "all", label: "Todas" },
            { key: "pending", label: "Pendientes" },
            { key: "completed", label: "Completadas" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`badge ${filter === f.key ? "badge-accent" : "badge-muted"}`}
              style={{
                padding: "8px 14px",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card shimmer"
                style={{ height: "72px", opacity: 0.5 }}
              />
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <>
            {/* Task list */}
            <div className="flex flex-col gap-2">
              {filteredTasks.map((task, i) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                  style={{ animationDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          </>
        ) : (
          /* Empty state */
          <div
            className="card fade-up text-center"
            style={{ padding: "64px 24px", marginTop: "32px" }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                margin: "0 auto 16px",
                borderRadius: "14px",
                background: "var(--bg-hover)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="3"/>
                <path d="M9 9h6M9 13h6M9 17h2"/>
              </svg>
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 500, marginBottom: "6px" }}>
              {filter === "all" ? "Sin tareas todavía" : `No hay tareas ${filter === "pending" ? "pendientes" : "completadas"}`}
            </h3>
            <p className="text-muted" style={{ fontSize: "14px" }}>
              {filter === "all" ? "Crea tu primera tarea arriba para comenzar." : filter === "pending" ? "¡Todas completadas! 🎉" : "Completa tareas para verlas aquí."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TaskCard ─────────────────────────────────────────────────────────────────
function TaskCard({
  task,
  onComplete,
  style,
}: {
  task: Task;
  onComplete?: (id: string) => void;
  style?: React.CSSProperties;
}) {
  const priority = task.priority_id ? PRIORITY_MAP[task.priority_id] : null;
  const dueDateColor = task.due_date ? getRelativeTimeClass(task.due_date) : undefined;

  return (
    <div
      className="card fade-up"
      style={{
        padding: "18px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        transition: "all 0.2s ease",
        cursor: task.completed ? "default" : "pointer",
        ...(task.completed ? { opacity: 0.6 } : {}),
        ...style,
      }}
      onClick={() => !task.completed && onComplete && onComplete(task.id)}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onComplete && onComplete(task.id);
        }}
        style={{
          flexShrink: 0,
          width: "20px",
          height: "20px",
          borderRadius: "6px",
          border: `1.5px solid ${task.completed ? "var(--success)" : "var(--border-hover)"}`,
          background: task.completed ? "var(--success-dim)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!task.completed) {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.background = "var(--accent-dim)";
          }
        }}
        onMouseLeave={(e) => {
          if (!task.completed) {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        {task.completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "var(--text-muted)" : "var(--text)",
              transition: "color 0.2s",
            }}
          >
            {task.title}
          </h3>
          {priority && (
            <span className={`badge ${priority.className}`} style={{ fontSize: "10px", padding: "3px 8px" }}>
              {priority.label}
            </span>
          )}
        </div>

        {task.description && (
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "8px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.description}
          </p>
        )}

        {task.due_date && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: dueDateColor || "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            {formatDate(task.due_date)}
          </p>
        )}
      </div>
    </div>
  );
}
