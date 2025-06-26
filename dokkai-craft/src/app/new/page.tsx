"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// アイコンa
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3
             c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2
             A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
)

const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
)

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3v4" />
        <path d="M3 5h4" />
        <path d="M19 15v4" />
        <path d="M17 17h4" />
        <path d="M11 21v-4" />
        <path d="M9 19h4" />
        <path d="m3 21 2-2" />
        <path d="m21 3-2 2" />
        <path d="m3 3 2 2" />
        <path d="m21 21-2-2" />
    </svg>
)

// モックデータ
const mockNewNovels = [
    {
        id: 1,
        title: "異世界スローライフ",
        author: "木村太郎",
        genre: "ファンタジー",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 123,
        bookmarks: 45,
        views: 7800,
        updatedAt: "2025-06-23",
    },
    {
        id: 2,
        title: "未来探偵の事件簿",
        author: "未来花子",
        genre: "SF",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 321,
        bookmarks: 76,
        views: 9200,
        updatedAt: "2025-06-22",
    },
    {
        id: 3,
        title: "初恋は突然に",
        author: "佐藤花子",
        genre: "恋愛",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 188,
        bookmarks: 33,
        views: 5200,
        updatedAt: "2025-06-24",
    },
]

const genreList = [
    "すべて",
    "ファンタジー",
    "恋愛",
    "ミステリー",
    "SF",
    "歴史",
    "ホラー",
    "コメディ",
    "アクション",
]

export default function NewReleasesPage() {
    const [selectedGenre, setSelectedGenre] = useState("すべて")

    const filteredNovels = selectedGenre === "すべて"
        ? mockNewNovels
        : mockNewNovels.filter((novel) => novel.genre === selectedGenre)

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
            {/* ヘッダー */}
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <SparklesIcon />
                    <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>新着作品</h1>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                    最近投稿された注目の作品をご紹介します。
                </p>
            </div>

            {/* ジャンルセレクト */}
            <div style={{ marginBottom: "1.5rem" }}>
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-color)",
                        fontSize: "1rem",
                        width: "200px",
                    }}
                >
                    {genreList.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>

            {/* 一覧 */}
            <div style={{ display: "grid", gap: "1rem" }}>
                {filteredNovels.map((novel) => (
                    <div
                        key={novel.id}
                        style={{
                            backgroundColor: "var(--bg-color)",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--border-color)",
                            padding: "1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        {/* カバー画像 */}
                        <Image
                            src={novel.coverImage}
                            alt={novel.title}
                            width={80}
                            height={120}
                            style={{ borderRadius: "0.25rem" }}
                        />

                        {/* 情報 */}
                        <div style={{ flex: "1", minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", margin: 0 }}>
                                    <Link href={`/novel/${novel.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        {novel.title}
                                    </Link>
                                </h3>
                                <span style={{
                                    backgroundColor: "var(--bg-muted)",
                                    color: "var(--text-muted)",
                                    padding: "0.125rem 0.5rem",
                                    borderRadius: "0.25rem",
                                    fontSize: "0.75rem",
                                }}>
                  {novel.genre}
                </span>
                            </div>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                                {novel.author}
                            </p>
                            <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <HeartIcon /> {novel.likes}
                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <BookmarkIcon /> {novel.bookmarks}
                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <EyeIcon /> {novel.views}
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
