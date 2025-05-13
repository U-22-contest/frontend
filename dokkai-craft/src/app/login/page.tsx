"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 実際の実装ではNextAuthを使用して認証
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // モックユーザーの検証（実際の実装では削除）
      if (email === "user@example.com" && password === "password") {
        alert("ログインしました: ようこそ戻ってきました！")
        router.push("/")
        router.refresh()
      } else {
        alert("ログインに失敗しました: メールアドレスまたはパスワードが正しくありません")
      }
    } catch (error) {
      alert("エラーが発生しました: 後でもう一度お試しください")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      // 実際の実装ではNextAuthを使用してGoogle認証
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Googleでのログインは実装中です")
      setIsLoading(false)
    } catch (error) {
      alert("エラーが発生しました: 後でもう一度お試しください")
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--bg-color)",
          borderRadius: "0.5rem",
          border: "1px solid var(--border-color)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "24rem",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>ログイン</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>アカウントにログインして続行してください</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ padding: "1.5rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                  fontSize: "0.875rem",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  パスワード
                </label>
                <Link
                  href="/forgot-password"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--primary-color)",
                    textDecoration: "none",
                  }}
                >
                  パスワードをお忘れですか？
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                  fontSize: "0.875rem",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "var(--primary-color)",
                color: "var(--primary-foreground)",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.5 : 1,
                marginBottom: "1rem",
              }}
            >
              {isLoading ? "ログイン中..." : "ログイン"}
            </button>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ width: "100%", height: "1px", backgroundColor: "var(--border-color)" }} />
              </div>
              <span
                style={{
                  position: "relative",
                  backgroundColor: "var(--bg-color)",
                  padding: "0 0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                }}
              >
                または
              </span>
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: "1px solid var(--border-color)",
                backgroundColor: "transparent",
                color: "var(--text-color)",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              Googleでログイン
            </button>
          </div>
        </form>
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--border-color)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            アカウントをお持ちでないですか？{" "}
            <Link
              href="/register"
              style={{
                color: "var(--primary-color)",
                textDecoration: "none",
              }}
            >
              登録する
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
