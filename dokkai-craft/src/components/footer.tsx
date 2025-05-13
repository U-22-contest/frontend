import Link from "next/link"
import styles from "./footer.module.css"

// メディアクエリ用のスタイル
const mediaStyles = {
  "@media (min-width: 768px)": {
    container: {
      flexDirection: "row",
    },
    logoContainer: {
      alignItems: "flex-start",
      gap: "0.5rem",
    },
    copyright: {
      textAlign: "left",
    },
    navContainer: {
      flexDirection: "row",
      gap: "1.5rem",
    },
    nav: {
      gap: "1.5rem",
    },
  },
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
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
            <span className={styles.logoText}>NovelAI</span>
          </Link>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} NovelAI. All rights reserved.
          </p>
        </div>
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            <Link href="/about" className={styles.navLink}>
              サービスについて
            </Link>
            <Link href="/terms" className={styles.navLink}>
              利用規約
            </Link>
            <Link href="/privacy" className={styles.navLink}>
              プライバシーポリシー
            </Link>
            <Link href="/contact" className={styles.navLink}>
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
