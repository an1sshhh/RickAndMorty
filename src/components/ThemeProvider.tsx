"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage and system preference
    const saved = localStorage.getItem("theme");
    const prefersDark =
      saved === "dark" ||
      (saved === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(prefersDark);
    applyTheme(prefersDark);
    setMounted(true);
  }, []);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    applyTheme(newIsDark);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div data-theme-toggle={isDark ? "dark" : "light"}>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-rickGreen dark:bg-rickDarkGreen text-white hover:bg-opacity-80 transition-all shadow-lg"
        aria-label="Toggle theme"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
      {children}
    </div>
  );
}
