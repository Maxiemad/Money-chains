"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";

const ThemeCtx = createContext<{
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}>({ theme: "dark", toggle: () => {}, setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeCtx);
}

const STORAGE_KEY = "mc-theme";

/**
 * App theme. Default is DARK. Choice persists in localStorage. Wraps the /app
 * shell so the `.theme-dark` overrides (globals.css) apply only inside the app
 * (the landing is always dark on its own).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") setThemeState(saved);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  return (
    <ThemeCtx.Provider value={{ theme, toggle, setTheme }}>
      <div className={theme === "dark" ? "theme-dark" : "theme-light"}>
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}

import { Moon, Sun } from "lucide-react";

/** Compact icon toggle for the topbar. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-navy ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

/** Labelled segmented control for Settings. */
export function ThemeChoice() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="inline-flex rounded-full border border-line p-1">
      {(["dark", "light"] as Theme[]).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTheme(t)}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
            theme === t ? "bg-mint/15 text-mint" : "text-muted hover:text-navy"
          }`}
        >
          {t === "dark" ? (
            <Moon className="h-3.5 w-3.5" />
          ) : (
            <Sun className="h-3.5 w-3.5" />
          )}
          {t}
        </button>
      ))}
    </div>
  );
}
