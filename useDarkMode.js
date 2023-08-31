import { useEffect, useState } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "dark"
  );
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
    root.classList.add('transition-all');
    root.classList.add('duration-300');
    root.classList.add('ease-in-out');

    localStorage.setItem("theme", theme);
  }, [theme]);

  return [colorTheme, setTheme];
}


export default useDarkMode;
