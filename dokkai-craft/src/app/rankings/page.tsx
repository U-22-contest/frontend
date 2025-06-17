"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// アイコンコンポーネント
const TrophyIcon = () => (
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
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 1.1.9 2 2 2s2-.9 2-2v-2.34" />
        <path d="M12 14V6" />
    </svg>
)

const HeartIcon = () => (
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
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
)

const BookmarkIcon = () => (
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
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
)

const EyeIcon = () => (
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
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

// モックデータ
const mockRankings = {
    weekly: [
        {
            id: 1,
            rank: 1,
            title: "異世界転生物語",
            author: "山田太郎",
            genre: "ファンタジー",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 1243,
            bookmarks: 456,
            views: 25600,
            change: "+2",
        },
        {
            id: 2,
            rank: 2,
            title: "現代恋愛物語",
            author: "佐藤花子",
            genre: "恋愛",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 987,
            bookmarks: 334,
            views: 18900,
            change: "-1",
        },
        {
            id: 3,
            rank: 3,
            title: "推理小説：謎の殺人事件",
            author: "田中次郎",
            genre: "ミステリー",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 876,
            bookmarks: 298,
            views: 16700,
            change: "+5",
        },
        {
            id: 4,
            rank: 4,
            title: "SF：未来都市の物語",
            author: "鈴木一郎",
            genre: "SF",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 654,
            bookmarks: 234,
            views: 12300,
            change: "+1",
        },
        {
            id: 5,
            rank: 5,
            title: "歴史小説：戦国の英雄",
            author: "高橋美咲",
            genre: "歴史",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 543,
            bookmarks: 187,
            views: 9800,
            change: "-2",
        },
    ],
    monthly: [
        {
            id: 1,
            rank: 1,
            title: "異世界転生物語",
            author: "山田太郎",
            genre: "ファンタジー",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 5432,
            bookmarks: 1234,
            views: 89000,
            change: "+1",
        },
        {
            id: 2,
            rank: 2,
            title: "現代恋愛物語",
            author: "佐藤花子",
            genre: "恋愛",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 4321,
            bookmarks: 987,
            views: 67000,
            change: "-1",
        },
        {
            id: 3,
            rank: 3,
            title: "推理小説：謎の殺人事件",
            author: "田中次郎",
            genre: "ミステリー",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 3987,
            bookmarks: 876,
            views: 54300,
            change: "+3",
        },
        {
            id: 4,
            rank: 4,
            title: "SF：未来都市の物語",
            author: "鈴木一郎",
            genre: "SF",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 3456,
            bookmarks: 765,
            views: 45600,
            change: "+2",
        },
        {
            id: 5,
            rank: 5,
            title: "歴史小説：戦国の英雄",
            author: "高橋美咲",
            genre: "歴史",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 2987,
            bookmarks: 654,
            views: 39800,
            change: "-2",
        },
    ],
    allTime: [
        {
            id: 1,
            rank: 1,
            title: "異世界転生物語",
            author: "山田太郎",
            genre: "ファンタジー",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 15432,
            bookmarks: 3456,
            views: 234000,
            change: "0",
        },
        {
            id: 2,
            rank: 2,
            title: "現代恋愛物語",
            author: "佐藤花子",
            genre: "恋愛",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 12321,
            bookmarks: 2987,
            views: 189000,
            change: "0",
        },
        {
            id: 3,
            rank: 3,
            title: "推理小説：謎の殺人事件",
            author: "田中次郎",
            genre: "ミステリー",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 10987,
            bookmarks: 2876,
            views: 167000,
            change: "0",
        },
        {
            id: 4,
            rank: 4,
            title: "SF：未来都市の物語",
            author: "鈴木一郎",
            genre: "SF",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 9456,
            bookmarks: 2765,
            views: 145000,
            change: "0",
        },
        {
            id: 5,
            rank: 5,
            title: "歴史小説：戦国の英雄",
            author: "高橋美咲",
            genre: "歴史",
            coverImage: "/placeholder.svg?height=200&width=150",
            likes: 8987,
            bookmarks: 2654,
            views: 123000,
            change: "0",
        },
    ],
}

const categories = ["すべて", "ファンタジー", "恋愛", "ミステリー", "SF", "歴史", "ホラー", "コメディ", "アクション"]

export default function RankingsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("weekly")
    const [selectedCategory, setSelectedCategory] = useState("すべて")

    const getRankingData = () => {
        return mockRankings[selectedPeriod as keyof typeof mockRankings] || mockRankings.weekly
    }

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "#FFD700" // 金
            case 2:
                return "#C0C0C0" // 銀
            case 3:
                return "#CD7F32" // 銅
            default:
                return "#6B7280"
        }
    }

    const getChangeColor = (change: string) => {
        if (change.startsWith("+")) return "#10B981"
        if (change.startsWith("-")) return "#EF4444"
        return "#6B7280"
    }

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <TrophyIcon />
                    <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>ランキング</h1>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                    人気の作品をチェックして、新しい物語を発見しましょう
                </p>
            </div>

            {/* フィルター */}
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                    {/* 期間選択 */}
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                            onClick={() => setSelectedPeriod("weekly")}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                border: "1px solid var(--border-color)",
                                backgroundColor: selectedPeriod === "weekly" ? "var(--primary-color)" : "transparent",
                                color: selectedPeriod === "weekly" ? "white" : "inherit",
                                cursor: "pointer",
                                fontWeight: selectedPeriod === "weekly" ? "600" : "400",
                            }}
                        >
                            週間
                        </button>
                        <button
                            onClick={() => setSelectedPeriod("monthly")}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                border: "1px solid var(--border-color)",
                                backgroundColor: selectedPeriod === "monthly" ? "var(--primary-color)" : "transparent",
                                color: selectedPeriod === "monthly" ? "white" : "inherit",
                                cursor: "pointer",
                                fontWeight: selectedPeriod === "monthly" ? "600" : "400",
                            }}
                        >
                            月間
                        </button>
                        <button
                            onClick={() => setSelectedPeriod("allTime")}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                border: "1px solid var(--border-color)",
                                backgroundColor: selectedPeriod === "allTime" ? "var(--primary-color)" : "transparent",
                                color: selectedPeriod === "allTime" ? "white" : "inherit",
                                cursor: "pointer",
                                fontWeight: selectedPeriod === "allTime" ? "600" : "400",
                            }}
                        >
                            総合
                        </button>
                    </div>

                    {/* カテゴリ選択 */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            border: "1px solid var(--border-color)",
                            backgroundColor: "var(--bg-color)",
                            fontSize: "1rem",
                            minWidth: "150px",
                        }}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ランキング一覧 */}
            <div style={{ display: "grid", gap: "1rem" }}>
                {getRankingData()
                    .filter((item) => selectedCategory === "すべて" || item.genre === selectedCategory)
                    .map((item) => (
                        <div
                            key={item.id}
                            style={{
                                backgroundColor: "var(--bg-color)",
                                borderRadius: "0.5rem",
                                border: "1px solid var(--border-color)",
                                padding: "1rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)"
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0)"
                                e.currentTarget.style.boxShadow = "none"
                            }}
                        >
                            {/* ランク */}
                            <div
                                style={{
                                    width: "3rem",
                                    height: "3rem",
                                    borderRadius: "50%",
                                    backgroundColor: getRankColor(item.rank),
                                    color: item.rank <= 3 ? "white" : "inherit",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "bold",
                                    fontSize: "1.25rem",
                                    flexShrink: 0,
                                }}
                            >
                                {item.rank}
                            </div>

                            {/* カバー画像 */}
                            <div style={{ flexShrink: 0 }}>
                                <Image
                                    src={item.coverImage}
                                    alt={item.title}
                                    width={80}
                                    height={120}
                                    style={{ borderRadius: "0.25rem" }}
                                />
                            </div>

                            {/* 作品情報 */}
                            <div style={{ flex: "1", minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", margin: 0 }}>
                                        <Link
                                            href={`/novel/${item.id}`}
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <span
                                        style={{
                                            backgroundColor: "var(--bg-muted)",
                                            color: "var(--text-muted)",
                                            padding: "0.125rem 0.5rem",
                                            borderRadius: "0.25rem",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {item.genre}
                                    </span>
                                </div>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                                    {item.author}
                                </p>
                                <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                        <HeartIcon />
                                        {item.likes.toLocaleString()}
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                        <BookmarkIcon />
                                        {item.bookmarks.toLocaleString()}
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                        <EyeIcon />
                                        {item.views.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* 順位変動 */}
                            <div
                                style={{
                                    color: getChangeColor(item.change),
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    flexShrink: 0,
                                }}
                            >
                                {item.change}
                            </div>
                        </div>
                    ))}
            </div>

            {/* ランキングが空の場合 */}
            {getRankingData().filter((item) => selectedCategory === "すべて" || item.genre === selectedCategory).length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                        このカテゴリのランキングデータがありません
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                        他のカテゴリをお試しください
                    </p>
                </div>
            )}
        </div>
    )
} 