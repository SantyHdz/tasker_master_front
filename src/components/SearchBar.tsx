"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Buscar tareas..." }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="card" style={{ padding: "0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ position: "relative", flex: 1 }}>
        <input
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="input"
          style={{
            background: "transparent",
            border: "none",
            padding: "0.75rem 1rem 0.75rem 2.5rem",
            fontSize: "0.875rem",
            width: "100%",
          }}
        />
        <svg
          width="1rem"
          height="1rem"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            position: "absolute",
            left: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-tertiary)",
          }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      {query && (
        <button
          onClick={handleClear}
          className="btn-ghost"
          style={{ padding: "0.5rem 0.75rem", fontSize: "0.875rem" }}
        >
          <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
