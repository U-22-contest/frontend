import Link from "next/link"

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-color)",
        padding: "1.5rem 0 2.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          "@media (min-width: 768px)": {
            flexDirection: "row",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            "@media (min-width: 768px)": {
              alignItems: "flex-start",
              gap: "0.5rem",
            },
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
            <span style={{ fontWeight: 500 }}>NovelAI</span>
          </Link>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              "@media (min-width: 768px)": {
                textAlign: "left",
              },
            }}
          >
            &copy; {new Date().getFullYear()} NovelAI. All rights reserved.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            "@media (min-width: 768px)": {
              flexDirection: "row",
              gap: "1.5rem",
            },
          }}
        >
          <nav
            style={{
              display: "flex",
              gap: "1rem",
              "@media (min-width: 768px)": {
                gap: "1.5rem",
              },
            }}
          >
            <Link
              href="/about"
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              サービスについて
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              利用規約
            </Link>
            <Link
              href="/privacy"
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
