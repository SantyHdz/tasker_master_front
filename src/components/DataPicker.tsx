"use client";

import { useState, useEffect, useRef } from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalInputValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function DatePicker({ value, onChange, placeholder = "Seleccionar fecha" }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const parsed = value ? new Date(value) : null;
  const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(parsed);
  const [hour, setHour] = useState(parsed?.getHours() ?? 9);
  const [minute, setMinute] = useState(parsed?.getMinutes() ?? 0);

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setSelectedDate(d);
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
      setHour(d.getHours());
      setMinute(d.getMinutes());
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // Cierra si el click es fuera del trigger Y fuera del dropdown
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Recalcula posición si la ventana cambia de tamaño
  useEffect(() => {
    if (!open) return;
    function handleResize() {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownPos({
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2,
        });
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  function handleOpen() {
  if (triggerRef.current) {
    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = 480; // altura aprox del calendario
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < dropdownHeight;

    setDropdownPos({
      top: openUpward ? rect.top - dropdownHeight - 8 : rect.bottom + 8,
      left: rect.left + rect.width / 2,
    });
  }
  setOpen(o => !o);
}

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }

  function handleSelectDay(day: number) {
    const d = new Date(viewYear, viewMonth, day, hour, minute);
    setSelectedDate(d);
    onChange(toLocalInputValue(d));
  }

  function handleTimeChange(h: number, m: number) {
    const clampedH = Math.max(0, Math.min(23, h));
    const clampedM = Math.max(0, Math.min(59, m));
    setHour(clampedH);
    setMinute(clampedM);
    if (selectedDate) {
      const d = new Date(selectedDate);
      d.setHours(clampedH, clampedM);
      setSelectedDate(d);
      onChange(toLocalInputValue(d));
    }
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function handleClear() {
    setSelectedDate(null);
    onChange("");
    setOpen(false);
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const today = new Date();

  const displayLabel = selectedDate
    ? selectedDate.toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" }) +
      " " + pad(hour) + ":" + pad(minute)
    : null;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="input"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5625rem 0.875rem",
          background: open ? "var(--bg-secondary)" : "var(--bg-glass)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${open ? "var(--accent-gold)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-md)",
          color: selectedDate ? "var(--text-primary)" : "var(--text-tertiary)",
          fontSize: "0.8125rem",
          fontFamily: "var(--font-mono)",
          cursor: "pointer",
          transition: "all var(--duration-base) ease",
          whiteSpace: "nowrap",
          boxShadow: open ? "0 0 0 3px var(--accent-gold-dim)" : "none",
          minWidth: 0,
          width: "100%",
          textAlign: "left",
        }}
      >
        <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {displayLabel ?? placeholder}
        </span>
        {selectedDate && (
          <span
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
            style={{
              marginLeft: "auto",
              color: "var(--text-tertiary)",
              cursor: "pointer",
              lineHeight: 1,
              flexShrink: 0,
              fontSize: "0.875rem",
            }}
          >
            ✕
          </span>
        )}
      </button>

      {/* Dropdown — usa position: fixed para escapar de cualquier stacking context */}
      {open && (
        <div
          className="glass"
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            transform: "translateX(-50%)",
            zIndex: 9999,
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-xl)",
            padding: "1rem",
            width: "17.5rem",
            animation: "fadeScale var(--duration-base) ease forwards",
          }}
        >
          {/* Month navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <button type="button" onClick={prevMonth} className="btn-icon" style={{ width: "2rem", height: "2rem", padding: 0 }}>
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>
            <span style={{ fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className="btn-icon" style={{ width: "2rem", height: "2rem", padding: 0 }}>
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "0.25rem" }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: "0.6875rem", color: "var(--text-tertiary)", fontWeight: 500, padding: "0.125rem 0", fontFamily: "var(--font-mono)" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.125rem" }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
              const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === viewMonth && selectedDate.getFullYear() === viewYear;
              const isPast = new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8125rem",
                    fontWeight: isSelected ? 600 : 400,
                    borderRadius: "var(--radius-sm)",
                    border: isToday && !isSelected ? "1px solid var(--accent-gold)" : "1px solid transparent",
                    background: isSelected ? "var(--accent-gold)" : "transparent",
                    color: isSelected ? "var(--text-inverse)" : isPast ? "var(--text-tertiary)" : "var(--text-primary)",
                    cursor: "pointer",
                    transition: "all var(--duration-fast) ease",
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "var(--bg-tertiary)"; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--border-default)", margin: "0.875rem 0" }} />

          {/* Time selector */}
          <div>
            <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", marginBottom: "0.5rem", fontWeight: 500, letterSpacing: "0.025em", textTransform: "uppercase" }}>
              Hora
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
              {/* Hour */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                <button type="button" onClick={() => handleTimeChange(hour + 1, minute)} className="btn-icon" style={{ width: "2rem", height: "1.625rem", padding: 0 }}>
                  <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18,15 12,9 6,15" /></svg>
                </button>
                <div style={{ width: "3.25rem", textAlign: "center", fontSize: "1.25rem", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--text-primary)", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", padding: "0.25rem 0", border: "1px solid var(--border-default)" }}>
                  {pad(hour)}
                </div>
                <button type="button" onClick={() => handleTimeChange(hour - 1, minute)} className="btn-icon" style={{ width: "2rem", height: "1.625rem", padding: 0 }}>
                  <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9" /></svg>
                </button>
              </div>

              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>:</span>

              {/* Minute */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                <button type="button" onClick={() => handleTimeChange(hour, minute + 5)} className="btn-icon" style={{ width: "2rem", height: "1.625rem", padding: 0 }}>
                  <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18,15 12,9 6,15" /></svg>
                </button>
                <div style={{ width: "3.25rem", textAlign: "center", fontSize: "1.25rem", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--text-primary)", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", padding: "0.25rem 0", border: "1px solid var(--border-default)" }}>
                  {pad(minute)}
                </div>
                <button type="button" onClick={() => handleTimeChange(hour, minute - 5)} className="btn-icon" style={{ width: "2rem", height: "1.625rem", padding: 0 }}>
                  <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Confirm */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-primary"
            style={{ width: "100%", marginTop: "0.875rem", padding: "0.625rem" }}
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
}