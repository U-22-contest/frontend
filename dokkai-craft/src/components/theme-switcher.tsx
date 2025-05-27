"use client"

import { useState, useEffect } from "react"

type Theme = "light" | "dark" | "sepia"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    // ローカルストレージからテーマを取得
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // システムの設定がダークモードの場合
      setTheme("dark")
      applyTheme("dark")
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    // 既存のテーマクラスを削除
    root.classList.remove("light", "dark", "sepia")

    // 新しいテーマクラスを追加
    root.classList.add(newTheme)

    // ダークモード用のクラス
    if (newTheme === "dark") {
      document.body.className = "dark"
    } else if (newTheme === "sepia") {
      document.body.className = "sepia"
    } else {
      document.body.className = "light"
    }

    // ローカルストレージに保存
    localStorage.setItem("theme", newTheme)
  }

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    setIsDropdownOpen(false)
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.375rem",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
            color: "var(--icon-color)",
        }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {theme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r="4.5" />
            <circle cx="7" cy="17" r="4" />
            <circle cx="19" cy="17" r="3" />
          </svg>
        )}
        <span
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        >
          テーマを変更
        </span>
      </button>
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 50,
            minWidth: "8rem",
            overflow: "hidden",
            backgroundColor: "var(--bg-color)",
            borderRadius: "0.375rem",
            border: "1px solid var(--border-color)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            marginTop: "0.5rem",
          }}
        >
          <div style={{ padding: "0.25rem" }}>
            <button
              onClick={() => changeTheme("light")}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.25rem",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "left",
                  color: "var(--icon-color)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.5rem" }}
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <span>ライトモード</span>
            </button>
            <button
              onClick={() => changeTheme("dark")}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.25rem",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "left",
                  color: "var(--icon-color)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.5rem" }}
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <span>ダークモード</span>
            </button>
            <button
              onClick={() => changeTheme("sepia")}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.25rem",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "left",
                  color: "var(--icon-color)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.5rem" }}
              >
                <circle cx="13.5" cy="6.5" r="4.5" />
                <circle cx="7" cy="17" r="4" />
                <circle cx="19" cy="17" r="3" />
              </svg>
              <span>セピアモード</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
