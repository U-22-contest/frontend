"use client"

import Link from "next/link"

export default function Home() {
  // 人気の小説データ (実際の実装ではAPIから取得)
  const popularNovels = [
    { id: 1, title: "異世界転生物語", author: "山田太郎", genre: "ファンタジー", views: 12500 },
    { id: 2, title: "都会の片隅で", author: "佐藤花子", genre: "日常", views: 8700 },
    { id: 3, title: "未来からの手紙", author: "鈴木一郎", genre: "SF", views: 10200 },
    { id: 4, title: "恋する魔法使い", author: "高橋恵", genre: "ロマンス", views: 9300 },
  ]

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem 2rem" }}>
      <section style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "2rem",
            gap: "1rem",
          }}
        >
          <h1 style={{ marginTop: "2rem", fontSize: "2.25rem", fontWeight: "bold", letterSpacing: "-0.025em" }}>
            物語を創り、共有する場所
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--text-muted)",
              maxWidth: "36rem",
            }}
          >
            AIの力で執筆をサポート。読者とのつながりを深める新しい小説プラットフォーム
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <Link
              href="/write"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                fontWeight: 500,
                backgroundColor: "var(--primary-color)",
                color: "var(--primary-foreground)",
                textDecoration: "none",
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
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              執筆を始める
            </Link>
            <Link
              href="/explore"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                fontWeight: 500,
                border: "1px solid var(--border-color)",
                backgroundColor: "transparent",
                color: "var(--text-color)",
                textDecoration: "none",
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              作品を探す
            </Link>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>人気の作品</h2>
          <Link
            href="/rankings"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              backgroundColor: "transparent",
              color: "var(--text-color)",
              textDecoration: "none",
            }}
          >
            もっと見る
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
        >
          {popularNovels.map((novel) => (
            <div
              key={novel.id}
              style={{
                backgroundColor: "var(--bg-color)",
                borderRadius: "0.5rem",
                border: "1px solid var(--border-color)",
                overflow: "hidden",
                transition: "all 0.3s",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div style={{ padding: "1.25rem 1.5rem 0.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {novel.title}
                </h3>
              </div>
              <div style={{ padding: "0 1.5rem 1.5rem" }}>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>作者: {novel.author}</p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>ジャンル: {novel.genre}</p>
                <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem", fontSize: "0.875rem" }}>
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
                    style={{ marginRight: "0.25rem", color: "var(--text-muted)" }}
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span>{novel.views.toLocaleString()} 閲覧</span>
                </div>
              </div>
              <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-color)" }}>
                <Link
                  href={`/novel/${novel.id}`}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textAlign: "center",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "transparent",
                    color: "var(--text-color)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--bg-muted)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                >
                  読む
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--bg-color)",
            borderRadius: "0.5rem",
            border: "1px solid var(--border-color)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>執筆者の方へ</h3>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li style={{ display: "flex", alignItems: "flex-start" }}>
                <div
                  style={{
                    marginRight: "0.5rem",
                    marginTop: "0.125rem",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    padding: "0.25rem",
                    borderRadius: "9999px",
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
                    style={{ color: "var(--primary-color)" }}
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <span>AIによる文章補完で執筆をスムーズに</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start" }}>
                <div
                  style={{
                    marginRight: "0.5rem",
                    marginTop: "0.125rem",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    padding: "0.25rem",
                    borderRadius: "9999px",
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
                    style={{ color: "var(--primary-color)" }}
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <span>場面描写の提案機能で創作の幅を広げる</span>
              </li>
            </ul>
          </div>
          <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-color)" }}>
            <Link
              href="/write"
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
              }}
            >
              執筆を始める
            </Link>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "var(--bg-color)",
            borderRadius: "0.5rem",
            border: "1px solid var(--border-color)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>読者の方へ</h3>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li style={{ display: "flex", alignItems: "flex-start" }}>
                <div
                  style={{
                    marginRight: "0.5rem",
                    marginTop: "0.125rem",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    padding: "0.25rem",
                    borderRadius: "9999px",
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
                    style={{ color: "var(--primary-color)" }}
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <span>本文中で質問や感想を投稿できる</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start" }}>
                <div
                  style={{
                    marginRight: "0.5rem",
                    marginTop: "0.125rem",
                    backgroundColor: "rgba(var(--primary-color-rgb), 0.1)",
                    padding: "0.25rem",
                    borderRadius: "9999px",
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
                    style={{ color: "var(--primary-color)" }}
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                </div>
                <span>お気に入り作家の更新を通知で受け取る</span>
              </li>
            </ul>
          </div>
          <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-color)" }}>
            <Link
              href="/explore"
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
              }}
            >
              作品を探す
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
