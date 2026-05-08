"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "resonance-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      toggleTheme: (origin) => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        const root = document.documentElement;

        root.style.setProperty("--theme-x", `${origin?.x ?? 0}px`);
        root.style.setProperty("--theme-y", `${origin?.y ?? 0}px`);

        const commit = () => {
          setTheme(next);
          window.localStorage.setItem(STORAGE_KEY, next);
          applyTheme(next);
        };

        const doc = document as Document & {
          startViewTransition?: (cb: () => void) => { ready: Promise<void> };
        };

        // Dan Toruno's suggestion: dark mode should reveal from the button's
        // access point as a clean circular / radial animation.
        if (!doc.startViewTransition) {
          commit();
          return;
        }

        const transition = doc.startViewTransition(commit);
        transition.ready.catch(() => undefined);
      },
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
