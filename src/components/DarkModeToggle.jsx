import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border transition-colors duration-300 cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <FiSun className="h-6 w-6" />
      ) : (
        <FiMoon className="h-6 w-6" />
      )}
    </button>
  );
}
