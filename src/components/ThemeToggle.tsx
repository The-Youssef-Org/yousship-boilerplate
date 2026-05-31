"use client";

import { useEffect, useState } from "react";
import config from "@/config";

const ThemeToggle = () => {
  // Initialize from config so server and client render identically (no hydration mismatch).
  // useEffect corrects it to the actual data-theme before the user can interact.
  const [isDark, setIsDark] = useState(
    config.enableThemeToggle || (config.theme as string) === config.darkTheme,
  );

  useEffect(() => {
    setIsDark(
      document.documentElement.getAttribute("data-theme") === config.darkTheme,
    );
  }, []);

  const toggle = () => {
    const next = isDark ? config.lightTheme : config.darkTheme;
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setIsDark(!isDark);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative h-6 w-11 shrink-0 rounded-full bg-base-content/15 transition-colors duration-200 hover:bg-base-content/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-content/40"
    >
      <span className="theme-toggle-knob absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-base-100 shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="theme-toggle-sun h-3 w-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" className="theme-toggle-moon h-3 w-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle;
