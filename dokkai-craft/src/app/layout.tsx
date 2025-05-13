import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NovelAI - AIパワードの小説プラットフォーム",
  description: "AIの力で執筆をサポート。読者とのつながりを深める新しい小説プラットフォーム",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <div style={{ flexGrow: 1 }}>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
