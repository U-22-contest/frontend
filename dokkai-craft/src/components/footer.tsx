import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-medium">NovelAI</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} NovelAI. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <nav className="flex gap-4 md:gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:underline">
              サービスについて
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              利用規約
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

