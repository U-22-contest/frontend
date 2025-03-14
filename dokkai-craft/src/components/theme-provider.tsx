import React, { useEffect, useState } from "react"
import { clsx } from "clsx"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  attribute = "data-theme",
  defaultTheme = "light",
  enableSystem = false,
  disableTransitionOnChange = false,
}) => {
  const [theme, setTheme] = useState<string>(defaultTheme)

  // クライアントサイドでテーマを設定
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (enableSystem) {
      // システムのテーマに基づいて設定
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
    }
  }, [enableSystem])

  // テーマが変更されたときにlocalStorageに保存
  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme)
      document.documentElement.setAttribute(attribute, theme)
    }
  }, [theme, attribute])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <div className={clsx(disableTransitionOnChange ? "" : "transition-colors", "min-h-screen")}>
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-white"
      >
        {theme === "light" ? "🌙" : "🌞"}
      </button>
      {children}
    </div>
  )
}
