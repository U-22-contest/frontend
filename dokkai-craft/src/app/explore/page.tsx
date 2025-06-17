"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// アイコンコンポーネント
const SearchIcon = () => (
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
        <path d="m21 21-4.35-4.35" />
    </svg>
)

const FilterIcon = () => (
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
        <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
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

// モックデータ
const mockNovels = [
    {
        id: 1,
        title: "異世界転生物語",
        author: "山田太郎",
        genre: "ファンタジー",
        description: "平凡なサラリーマンが異世界に転生し、勇者として冒険を始める物語。",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 843,
        bookmarks: 256,
        views: 12500,
        updatedAt: "2023-11-20",
        tags: ["異世界", "転生", "ファンタジー", "冒険"],
    },
    {
        id: 2,
        title: "現代恋愛物語",
        author: "佐藤花子",
        genre: "恋愛",
        description: "都会で働くOLと隣の会社のイケメン社長の恋愛ストーリー。",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 567,
        bookmarks: 189,
        views: 8900,
        updatedAt: "2023-11-19",
        tags: ["恋愛", "現代", "OL", "社長"],
    },
    {
        id: 3,
        title: "推理小説：謎の殺人事件",
        author: "田中次郎",
        genre: "ミステリー",
        description: "閉鎖された山荘で起こった連続殺人事件の謎を解く推理小説。",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 432,
        bookmarks: 145,
        views: 6700,
        updatedAt: "2023-11-18",
        tags: ["推理", "ミステリー", "殺人", "謎"],
    },
    {
        id: 4,
        title: "SF：未来都市の物語",
        author: "鈴木一郎",
        genre: "SF",
        description: "2150年の未来都市で起こるサイバーパンクな物語。",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 298,
        bookmarks: 98,
        views: 4500,
        updatedAt: "2023-11-17",
        tags: ["SF", "未来", "サイバーパンク", "都市"],
    },
    {
        id: 5,
        title: "歴史小説：戦国の英雄",
        author: "高橋美咲",
        genre: "歴史",
        description: "戦国時代を舞台にした武将の物語。",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 345,
        bookmarks: 112,
        views: 5200,
        updatedAt: "2023-11-16",
        tags: ["歴史", "戦国", "武将", "時代劇"],
    },
    {
        id: 6,
        title: "ホラー：廃病院の怪談",
        author: "伊藤恵子",
        genre: "ホラー",
        description: "廃墟となった病院で起こる恐ろしい出来事。",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 234,
        bookmarks: 87,
        views: 3800,
        updatedAt: "2023-11-15",
        tags: ["ホラー", "怪談", "廃墟", "病院"],
    },
]

const genres = ["すべて", "ファンタジー", "恋愛", "ミステリー", "SF", "歴史", "ホラー", "コメディ", "アクション"]

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("すべて")
    const [sortBy, setSortBy] = useState("updatedAt")

    // フィルタリングとソート
    const filteredNovels = mockNovels
        .filter((novel) => {
            const matchesSearch = novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                novel.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                novel.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesGenre = selectedGenre === "すべて" || novel.genre === selectedGenre
            return matchesSearch && matchesGenre
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "likes":
                    return b.likes - a.likes
                case "bookmarks":
                    return b.bookmarks - a.bookmarks
                case "views":
                    return b.views - a.views
                case "updatedAt":
                default:
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            }
        })

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>作品を探す</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                    あなたの好みに合った作品を見つけましょう
                </p>
            </div>

            {/* 検索とフィルター */}
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                    {/* 検索バー */}
                    <div style={{ flex: "1", minWidth: "300px", position: "relative" }}>
                        <div style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }}>
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="作品名、作者名、タグで検索..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                                borderRadius: "0.5rem",
                                border: "1px solid var(--border-color)",
                                backgroundColor: "var(--bg-color)",
                                fontSize: "1rem",
                            }}
                        />
                    </div>

                    {/* ジャンルフィルター */}
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--border-color)",
                            backgroundColor: "var(--bg-color)",
                            fontSize: "1rem",
                            minWidth: "150px",
                        }}
                    >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>

                    {/* ソート */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--border-color)",
                            backgroundColor: "var(--bg-color)",
                            fontSize: "1rem",
                            minWidth: "150px",
                        }}
                    >
                        <option value="updatedAt">更新日順</option>
                        <option value="likes">いいね数順</option>
                        <option value="bookmarks">ブックマーク数順</option>
                        <option value="views">閲覧数順</option>
                    </select>
                </div>

                {/* 検索結果数 */}
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    {filteredNovels.length}件の作品が見つかりました
                </p>
            </div>

            {/* 作品一覧 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                {filteredNovels.map((novel) => (
                    <div
                        key={novel.id}
                        style={{
                            backgroundColor: "var(--bg-color)",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--border-color)",
                            overflow: "hidden",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)"
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)"
                            e.currentTarget.style.boxShadow = "none"
                        }}
                    >
                        <Link href={`/novel/${novel.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div style={{ position: "relative" }}>
                                <Image
                                    src={novel.coverImage}
                                    alt={novel.title}
                                    width={300}
                                    height={200}
                                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "0.5rem",
                                        left: "0.5rem",
                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                        color: "white",
                                        padding: "0.25rem 0.5rem",
                                        borderRadius: "0.25rem",
                                        fontSize: "0.75rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    {novel.genre}
                                </div>
                            </div>

                            <div style={{ padding: "1rem" }}>
                                <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                                    {novel.title}
                                </h3>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                                    {novel.author}
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "var(--text-muted)",
                                        marginBottom: "1rem",
                                        lineHeight: "1.5",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {novel.description}
                                </p>

                                {/* タグ */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "1rem" }}>
                                    {novel.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            style={{
                                                backgroundColor: "var(--bg-muted)",
                                                color: "var(--text-muted)",
                                                padding: "0.125rem 0.5rem",
                                                borderRadius: "0.25rem",
                                                fontSize: "0.75rem",
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* 統計情報 */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                            <HeartIcon />
                                            {novel.likes}
                                        </span>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                            <BookmarkIcon />
                                            {novel.bookmarks}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                        更新: {novel.updatedAt}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* 検索結果が空の場合 */}
            {filteredNovels.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                        条件に一致する作品が見つかりませんでした
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                        検索条件を変更してお試しください
                    </p>
                </div>
            )}
        </div>
    )
} 