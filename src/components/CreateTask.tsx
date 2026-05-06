"use client";

import { useState } from "react";
import { createTask } from "@/services/api";
import DatePicker from "@/components/DataPicker";

interface CreateTaskProps {
  refresh: () => void;
}

type Priority = 1 | 2 | 3;

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 1, label: "Baja", color: "var(--text-tertiary)" },
  { value: 2, label: "Media", color: "var(--warning)" },
  { value: 3, label: "Alta", color: "var(--danger)" },
];

export default function CreateTask({ refresh }: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(2);
  const [dueDate, setDueDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      await createTask(token, {
        title: title.trim(),
        description: description.trim() || undefined,
        priority_id: priority,
        due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
      });
      setTitle("");
      setDescription("");
      setPriority(2);
      setDueDate("");
      setIsExpanded(false);
      refresh();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isExpanded) {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <div className="card fade-up" style={{ padding: "0", overflow: "visible" }}>
      {/* Input area */}
      <div style={{ padding: "1.25rem" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="¿Qué necesitas hacer?"
          className="input"
          style={{
            background: "transparent",
            border: "none",
            padding: "0",
            fontSize: "0.9375rem",
            marginBottom: "0",
            width: "100%",
          }}
        />

        {isExpanded && (
          <div className="fade-in" style={{ marginTop: "1rem" }}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción (opcional)"
              className="input textarea"
              style={{
                background: "var(--bg-glass)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid var(--border-default)",
                resize: "vertical",
                minHeight: "5rem",
                width: "100%",
              }}
            />
          </div>
        )}

        {/* Controls row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Priority selector */}
          <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
            {PRIORITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPriority(opt.value)}
                title={opt.label}
                style={{
                  width: "1.875rem",
                  height: "1.875rem",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${priority === opt.value ? opt.color : "var(--border-default)"}`,
                  background: priority === opt.value ? `${opt.color}20` : "transparent",
                  color: opt.color,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--duration-base) ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {opt.value === 1 && "↓"}
                {opt.value === 2 && "●"}
                {opt.value === 3 && "↑"}
              </button>
            ))}
          </div>

          {/* Date picker */}
          {isExpanded && (
            <div style={{ flex: 1, minWidth: "10rem" }}>
              <DatePicker
                value={dueDate}
                onChange={setDueDate}
                placeholder="Fecha límite"
              />
            </div>
          )}

          {/* Expand toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-ghost"
            style={{ marginLeft: "auto", padding: "0.375rem 0.625rem", fontSize: "0.8125rem", flexShrink: 0 }}
          >
            {isExpanded ? "Menos" : "Más opciones"}
          </button>

          {/* Create button */}
          <button
            type="button"
            className="btn-primary"
            onClick={handleCreate}
            disabled={loading || !title.trim()}
            style={{ padding: "0.625rem 1.25rem", flexShrink: 0 }}
          >
            {loading ? (
              <svg className="animate-spin" style={{ width: "1rem", height: "1rem" }} viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            ) : (
              "Crear"
            )}
          </button>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, transparent, var(--accent-gold), transparent)`,
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
        }}
      />
    </div>
  );
}
