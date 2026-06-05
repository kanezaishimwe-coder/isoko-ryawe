(() => {
  const STORAGE_KEY = "isokoTheme";

  function normalizeTheme(value) {
    const v = String(value || "").toLowerCase();
    if (v === "light" || v === "dark") return v;
    return null;
  }

  function getCurrentTheme() {
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "light" || attr === "dark" ? attr : "dark";
  }

  function setTheme(theme) {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    const toggle = document.getElementById("themeToggle");
  }

  function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  }

  function init() {
    const saved = normalizeTheme(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setTheme(saved);
    } else {
      // Default: follow OS preference
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", toggleTheme);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

