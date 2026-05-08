"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ToggleOrigin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  isSwitching: boolean;
  toggleTheme: (origin?: ToggleOrigin) => void;
};

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "resonance-theme";
const TRANSITION_DURATION = 820;
const TRANSITION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";


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
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      isSwitching,
      toggleTheme: (origin) => {
        if (isSwitching) return;

        const next: Theme = theme === "dark" ? "light" : "dark";
        const root = document.documentElement;
        const x = origin?.x ?? window.innerWidth / 2;
        const y = origin?.y ?? 48;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );

        root.style.setProperty("--theme-x", `${x}px`);
        root.style.setProperty("--theme-y", `${y}px`);
        root.classList.add("theme-transitioning");
        setIsSwitching(true);

        const commit = () => {
          setTheme(next);
          window.localStorage.setItem(STORAGE_KEY, next);
          applyTheme(next);
        };

        const finish = () => {
          root.classList.remove("theme-transitioning");
          setIsSwitching(false);
        };

        const doc = document as Document & {
          startViewTransition?: (cb: () => void) => ViewTransition;
        };

        // Dan Toruno's note: the first pass felt choppy. Let the browser take
        // one clean snapshot, suppress duplicate color transitions underneath,
        // then animate the new root with a slower compositor-friendly reveal.
        if (!doc.startViewTransition) {
          commit();
          window.setTimeout(finish, 180);
          return;
        }

        const transition = doc.startViewTransition(commit);
        transition.ready
          .then(() => {
            root.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: TRANSITION_DURATION,
                easing: TRANSITION_EASING,
                pseudoElement: "::view-transition-new(root)",
              },
            );
          })
          .catch(() => undefined);

        transition.finished.then(finish).catch(finish);
      },
    };
  }, [isSwitching, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
