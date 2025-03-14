"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Palette } from "lucide-react"

type Theme = "light" | "dark" | "sepia"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light")

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
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // セピアモード用のスタイル
    if (newTheme === "sepia") {
      root.style.setProperty("--background", "35 30% 90%")
      root.style.setProperty("--foreground", "35 40% 10%")
    } else {
      root.style.removeProperty("--background")
      root.style.removeProperty("--foreground")
    }

    // ローカルストレージに保存
    localStorage.setItem("theme", newTheme)
  }

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {theme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : theme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Palette className="h-5 w-5" />
          )}
          <span className="sr-only">テーマを変更</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>ライトモード</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>ダークモード</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("sepia")}>
          <Palette className="mr-2 h-4 w-4" />
          <span>セピアモード</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

