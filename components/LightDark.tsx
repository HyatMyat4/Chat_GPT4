import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
export default function LightDark() {
  const [mounted, setmounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  useEffect(() => {
    setmounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      onClick={
        currentTheme === "dark"
          ? () => setTheme("light")
          : () => setTheme("dark")
      }
      className="w-full h-[45px] hover:bg-slate-200 dark:hover:bg-[#2A2B32] mt-[1px] cursor-pointer rounded-[5px] frc justify-start "
    >
      {currentTheme === "dark" ? (
        <FiSun className=" text-black dark:text-[#d0d0d0] mx-[10px]" />
      ) : (
        <FiMoon className=" text-black dark:text-[#d0d0d0] mx-[10px]" />
      )}

      <span className=" text-black dark:text-[#F2F2F2] text-[14px] ">Light mode</span>
    </div>
  );
}
