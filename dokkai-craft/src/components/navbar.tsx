"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ThemeSwitcher } from "./theme-switcher"
import Image from "next/image"
import { useRouter } from "next/navigation";

// 仮のユーザー認証状態
const isAuthenticated = true

export default function Navbar() {const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const exploreDropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // 画面サイズの検出
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 初期チェック
    checkIfMobile()

    // リサイズイベントのリスナー
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // クリックイベントのハンドラー
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Explore ドロップダウン
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(event.target as Node)) {
        setIsExploreDropdownOpen(false)
      }

      // User ドロップダウン
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false)
      }

      // モバイルメニュー
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-menu-trigger="true"]')
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border-color)",
        backgroundColor: "var(--bg-translucent)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          height: "4rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                display: isMobile ? "none" : "inline-block",
              }}
            >
              NovelAI
            </span>
          </Link>

          <nav
            style={{
              display: isMobile ? "none" : "flex",
            }}
          >
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li style={{ position: "relative" }}>
                <div ref={exploreDropdownRef}>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "4rem",
                      padding: "0 1rem",
                      fontWeight: 500,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                        color: "var(--icon-color)",
                    }}
                    onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
                  >
                    探索
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
                      style={{ marginLeft: "0.25rem" }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {isExploreDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "var(--bg-color)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        width: "500px",
                        zIndex: 50,
                        padding: "1rem",
                      }}
                    >
                      <ul
                        style={{
                          display: "grid",
                          gap: "0.75rem",
                          gridTemplateColumns: "1fr 1fr",
                        }}
                      >
                        <li>
                          <Link
                            href="/rankings"
                            style={{
                              display: "flex",
                              height: "100%",
                              width: "100%",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              borderRadius: "0.5rem",
                              background: "linear-gradient(to bottom, var(--bg-muted-50), var(--bg-muted))",
                              padding: "1.5rem",
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <div
                              style={{
                                marginBottom: "0.5rem",
                                marginTop: "1rem",
                                fontSize: "1.125rem",
                                fontWeight: 500,
                              }}
                            >
                              ランキング
                            </div>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>人気の作品をチェック</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/new"
                            style={{
                              display: "flex",
                              height: "100%",
                              width: "100%",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              borderRadius: "0.5rem",
                              background: "linear-gradient(to bottom, var(--bg-muted-50), var(--bg-muted))",
                              padding: "1.5rem",
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <div
                              style={{
                                marginBottom: "0.5rem",
                                marginTop: "1rem",
                                fontSize: "1.125rem",
                                fontWeight: 500,
                              }}
                            >
                              新着作品
                            </div>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>最近投稿された作品</p>
                          </Link>
                        </li>
                        <li style={{ gridColumn: "span 2" }}>
                          <Link
                            href="/genres"
                            style={{
                              display: "grid",
                              height: "100%",
                              width: "100%",
                              gridTemplateColumns: "repeat(4, 1fr)",
                              placeItems: "center",
                              gap: "0.25rem",
                              borderRadius: "0.5rem",
                              padding: "1rem",
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            {["ファンタジー", "SF", "恋愛", "日常"].map((genre) => (
                              <div
                                key={genre}
                                style={{
                                  textAlign: "center",
                                  borderRadius: "0.5rem",
                                  padding: "0.5rem 0.75rem",
                                }}
                              >
                                <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{genre}</div>
                              </div>
                            ))}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <Link
                  href="/write"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "4rem",
                    padding: "0 1rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  執筆する
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {isSearchOpen ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="search"
                placeholder="作品名、作者名で検索..."
                style={{
                  width: "300px",
                  height: "2.5rem",
                  padding: "0 0.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                }}
                autoFocus
              />
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.5rem",
                  height: "2.5rem",
                  marginLeft: "0.5rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                    color: "var(--icon-color)",
                }}
                onClick={() => setIsSearchOpen(false)}
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
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button //検索アイコン
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
              onClick={() => setIsSearchOpen(true)}
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
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          )}

          <ThemeSwitcher />

          {isAuthenticated ? (
            <>
              <button //ベルマーク
                style={{
                  display: isMobile ? "none" : "flex",
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
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </button>

              <div style={{ position: "relative" }} ref={userDropdownRef}>
                <button
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "9999px",
                      overflow: "hidden",
                      backgroundColor: "var(--bg-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src="/images/default-avatar.png"
                      alt="ユーザーアイコン"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span
                      style={{
                        display: "none",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 500,
                      }}
                    >
                      ユ
                    </span>
                  </div>
                </button>
                {isUserDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      width: "14rem",
                      backgroundColor: "var(--bg-color)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      zIndex: 50,
                      marginTop: "0.5rem",
                    }}
                  >
                    <div style={{ padding: "0.75rem 1rem", fontWeight: "normal" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <p style={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: "1.25" }}>ユーザー名</p>
                        <p style={{ fontSize: "0.75rem", lineHeight: "1.25", color: "var(--text-muted)" }}>
                          user@example.com
                        </p>
                      </div>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "var(--border-color)" }} />
                    <div style={{ padding: "0.5rem" }}>
                      <Link
                        href="/profile"
                        style={{
                          display: "block",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        プロフィール
                      </Link>
                      <Link
                        href="/dashboard"
                        style={{
                          display: "block",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        ダッシュボード
                      </Link>
                      <Link
                        href="/bookmarks"
                        style={{
                          display: "block",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        ブックマーク
                      </Link>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "var(--border-color)" }} />
                    <div style={{ padding: "0.5rem" }}>
                        <button
                            style={{
                                display: "block",
                                width: "100%",
                                textAlign: "left",
                                padding: "0.5rem 0.75rem",
                                borderRadius: "0.25rem",
                                fontSize: "0.875rem",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                color: "inherit",
                            }}
                            onClick={() => {
                                // ログアウト処理（仮）→ 必要に応じて実装
                                // ここにトークン削除処理などを挿入

                                setIsUserDropdownOpen(false); // メニューを閉じる
                                router.push("/login"); // ← ログイン画面に遷移
                            }}
                        >
                            ログアウト
                        </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                display: isMobile ? "none" : "flex",
                gap: "0.5rem",
              }}
            >
              <Link
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  border: "1px solid var(--border-color)",
                  backgroundColor: "transparent",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ログイン
              </Link>
              <Link
                href="/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  backgroundColor: "var(--primary-color)",
                  color: "var(--primary-foreground)",
                  textDecoration: "none",
                  border: "none",
                }}
              >
                登録
              </Link>
            </div>
          )}

          <button //ハンバーガー
            style={{
              display: isMobile ? "flex" : "none",
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
            onClick={() => setIsMenuOpen(true)}
            data-menu-trigger="true"
          >
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
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            maxWidth: "24rem",
            backgroundColor: "var(--bg-color)",
            boxShadow: "-4px 0 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 100,
            padding: "1.5rem",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.25rem",
                fontWeight: 600,
                textDecoration: "none",
                color: "inherit",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>NovelAI</span>
            </Link>
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
              onClick={() => setIsMenuOpen(false)}
            >
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link
              href="/explore"
              style={{
                fontSize: "1rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              作品を探す
            </Link>
            <Link
              href="/rankings"
              style={{
                fontSize: "1rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              ランキング
            </Link>
            <Link
              href="/write"
              style={{
                fontSize: "1rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              執筆する
            </Link>
            <Link
              href="/dashboard"
              style={{
                fontSize: "1rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              ダッシュボード
            </Link>
            {!isAuthenticated && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <Link
                  href="/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    border: "1px solid var(--border-color)",
                    backgroundColor: "transparent",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ログイン
                </Link>
                <Link
                  href="/register"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    backgroundColor: "var(--primary-color)",
                    color: "var(--primary-foreground)",
                    textDecoration: "none",
                    border: "none",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  登録
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
