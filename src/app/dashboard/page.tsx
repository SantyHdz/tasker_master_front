"use client";

import { useEffect, useState, useCallback } from "react";
import { getTasks, toggleTask, deleteTask, Task, TasksResponse } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import CreateTask from "@/components/CreateTask";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const PRIORITY_MAP: Record<number, { label: string; className: string; color: string }> = {
  1: { label: "Baja", className: "badge-muted", color: "var(--text-tertiary)" },
  2: { label: "Media", className: "badge-warning", color: "var(--warning)" },
  3: { label: "Alta", className: "badge-danger", color: "var(--danger)" },
};

function formatDate(date: string) {
  const d = new Date(date);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const isTomorrow =
    d.toDateString() === new Date(now.getTime() + 86400000).toDateString();
  if (isToday)
    return `Hoy, ${d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`;
  if (isTomorrow)
    return `Mañana, ${d.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`;
  return d.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDateColor(date: string) {
  const diff = new Date(date).getTime() - Date.now();
  if (diff < 0) return "var(--danger)";
  if (diff < 86400000) return "var(--warning)";
  return "var(--text-tertiary)";
}

export default function Dashboard() {
  useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  const fetchTasks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      const data: TasksResponse = await getTasks(token, searchQuery || undefined, skip, itemsPerPage);
      setTasks(data.tasks);
      setTotalItems(data.total);
    } catch {
      setError("No se pudieron cargar las tareas.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggle = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const updated = await toggleTask(token, id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError("No se pudo actualizar la tarea.");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await deleteTask(token, id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("No se pudo eliminar la tarea.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/login";
  };

  const pending = tasks.filter((t) => !t.is_completed);
  const completed = tasks.filter((t) => t.is_completed);
  const filteredTasks =
    filter === "pending" ? pending : filter === "completed" ? completed : tasks;

  return (
    <div className="relative min-h-screen">
      <div className="bg-grid" />
      <div className="bg-gradient-orb top" />

      {/* Header */}
      <header
        className="sticky top-0 z-50 glass"
        style={{
          margin: "1rem",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <div style={{ maxWidth: "56.25rem", margin: "0 auto", padding: "1rem 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link
              href="/dashboard"
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-light) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-gold)",
                }}
              >
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="3" rx="1.5" fill="var(--text-inverse)" />
                  <rect x="3" y="10" width="13" height="3" rx="1.5" fill="var(--text-inverse)" />
                  <rect x="3" y="15" width="15" height="3" rx="1.5" fill="var(--text-inverse)" />
                </svg>
              </div>
              <span style={{ fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
                TaskerMaster
              </span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                className="flex items-center gap-3 glass"
                style={{
                  padding: "0.5rem 0.875rem",
                  borderRadius: "var(--radius-full)",
                }}
              >
                <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--accent-gold)" }}>{pending.length}</strong>{" "}
                  pendiente{pending.length !== 1 ? "s" : ""}
                </span>
                <span style={{ width: "1px", height: "0.875rem", background: "var(--border-default)" }} />
                <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--success)" }}>{completed.length}</strong>{" "}
                  completada{completed.length !== 1 ? "s" : ""}
                </span>
              </div>

              <button
                className="btn-ghost"
                onClick={handleLogout}
                style={{ padding: "0.5rem 0.875rem", fontSize: "0.8125rem", border: "1px solid var(--border-default)" }}
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: "47.5rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <div className="fade-up" style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "0.5rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
            Tus tareas
          </h1>
          <p className="text-muted" style={{ fontSize: "0.9375rem" }}>
            {new Date().toLocaleDateString("es-CO", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <SearchBar onSearch={(query) => { setSearchQuery(query); setCurrentPage(1); }} placeholder="Buscar por título o descripción..." />

        <CreateTask refresh={fetchTasks} />

        {error && (
          <div
            className="card fade-in"
            style={{ borderColor: "rgba(239,68,68,0.3)", background: "var(--danger-dim)", marginBottom: "1rem" }}
          >
            <p style={{ color: "var(--danger)", fontSize: "0.875rem" }}>{error}</p>
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
              onClick={() => { setFilter(f.key as typeof filter); setCurrentPage(1); }}
              className={`badge ${filter === f.key ? "badge-accent" : "badge-muted"}`}
              style={{ cursor: "pointer", transition: "all var(--duration-base) ease" }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card shimmer" style={{ height: "4.5rem", opacity: 0.5 }} />
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <>
            <div className="flex flex-col gap-2">
              {filteredTasks.map((task, i) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  style={{ animationDelay: `${i * 40}ms` }}
                />
              ))}
            </div>

            {totalItems > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / itemsPerPage)}
                onPageChange={setCurrentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            )}
          </>
        ) : (
          <div className="card fade-up text-center" style={{ padding: "4rem 1.5rem", marginTop: "2rem" }}>
            <div
              style={{
                width: "3.5rem",
                height: "3.5rem",
                margin: "0 auto 1rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path d="M9 9h6M9 13h6M9 17h2" />
              </svg>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "0.375rem", color: "var(--text-primary)" }}>
              {filter === "all"
                ? "Sin tareas todavía"
                : `No hay tareas ${filter === "pending" ? "pendientes" : "completadas"}`}
            </h3>
            <p className="text-muted" style={{ fontSize: "0.875rem" }}>
              {filter === "all"
                ? "Crea tu primera tarea arriba para comenzar."
                : filter === "pending"
                ? "¡Todas completadas!"
                : "Completa tareas para verlas aquí."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TaskCard ──────────────────────────────────────────────────────────────────
function TaskCard({
  task,
  onToggle,
  onDelete,
  style,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  style?: React.CSSProperties;
}) {
  const priority = task.priority_id ? PRIORITY_MAP[task.priority_id] : null;
  const dueDateColor = task.due_date ? getDateColor(task.due_date) : undefined;

  return (
    <div
      className="card card-interactive fade-up"
      style={{
        padding: "1.125rem 1.25rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.875rem",
        ...(task.is_completed ? { opacity: 0.6 } : {}),
        ...style,
      }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        style={{
          flexShrink: 0,
          marginTop: "0.0625rem",
          width: "1.25rem",
          height: "1.25rem",
          borderRadius: "var(--radius-sm)",
          border: `1.5px solid ${task.is_completed ? "var(--success)" : "var(--border-hover)"}`,
          background: task.is_completed ? "var(--success-dim)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all var(--duration-base) ease",
        }}
      >
        {task.is_completed && (
          <svg width="0.75rem" height="0.75rem" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="var(--success)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "0.25rem",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: task.is_completed ? "line-through" : "none",
              color: task.is_completed ? "var(--text-secondary)" : "var(--text-primary)",
            }}
          >
            {task.title}
          </h3>
          {priority && (
            <span className={`badge ${priority.className}`} style={{ fontSize: "0.625rem", padding: "0.1875rem 0.5rem" }}>
              {priority.label}
            </span>
          )}
        </div>

        {task.description && (
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              marginBottom: "0.5rem",
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
              fontSize: "0.6875rem",
              color: dueDateColor,
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {formatDate(task.due_date)}
          </p>
        )}
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(task.id)}
        title="Eliminar tarea"
        style={{
          flexShrink: 0,
          width: "1.75rem",
          height: "1.75rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid transparent",
          background: "transparent",
          color: "var(--text-tertiary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all var(--duration-base) ease",
          opacity: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.color = "var(--danger)";
          e.currentTarget.style.background = "var(--danger-dim)";
          e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0";
          e.currentTarget.style.color = "var(--text-tertiary)";
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "transparent";
        }}
      >
        <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3,6 5,6 21,6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  );
}