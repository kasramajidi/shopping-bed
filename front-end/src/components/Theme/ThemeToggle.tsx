"use client";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./../../context/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} className="cursor-pointer text-xl">
      {isDarkMode ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-[rgb(57, 78, 106)]" />
      )}
    </div>
  );
}
