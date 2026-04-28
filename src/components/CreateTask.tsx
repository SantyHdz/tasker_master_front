"use client";

import { useState } from "react";
import { createTask } from "@/services/api";

interface CreateTaskProps {
  refresh: () => void;
}

type Priority = 1 | 2 | 3;

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 1, label: "Baja", color: "var(--text-muted)" },
  { value: 2, label: "Media", color: "#fbbf24" },
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
        due_date: dueDate || undefined,
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <div className="card fade-up mb-6" style={{ padding: "0", overflow: "hidden" }}>
      {/* Input area */}
      <div style={{ padding: "20px" }}>
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
            fontSize: "15px",
            marginBottom: "8px",
          }}
        />

        {isExpanded && (
          <div className="fade-in" style={{ marginTop: "16px" }}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción (opcional)"
              className="input textarea"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                resize: "vertical",
                minHeight: "80px",
              }}
            />
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" }}>
          {/* Priority selector */}
          <div style={{ display: "flex", gap: "6px" }}>
            {PRIORITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPriority(opt.value)}
                title={opt.label}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  border: `1px solid ${priority === opt.value ? opt.color : "var(--border)"}`,
                  background: priority === opt.value ? `${opt.color}20` : "transparent",
                  color: opt.color,
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (priority !== opt.value) {
                    e.currentTarget.style.borderColor = opt.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (priority !== opt.value) {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }
                }}
              >
                {opt.value === 1 && "↓"}
                {opt.value === 2 && "●"}
                {opt.value === 3 && "↑"}
              </button>
            ))}
          </div>

          {/* Due date */}
          {isExpanded && (
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input"
              style={{
                padding: "8px 12px",
                fontSize: "13px",
                width: "auto",
                fontFamily: "var(--font-mono)",
              }}
            />
          )}

          {/* Expand toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-ghost"
            style={{ marginLeft: "auto", padding: "6px 10px", fontSize: "13px" }}
          >
            {isExpanded ? "Menos" : "Más opciones"}
          </button>

          {/* Create button */}
          <button
            className="btn-primary"
            onClick={handleCreate}
            disabled={loading || !title.trim()}
            style={{ padding: "10px 20px" }}
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            ) : (
              "+"
            )}
          </button>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
        }}
      />
    </div>
  );
}
