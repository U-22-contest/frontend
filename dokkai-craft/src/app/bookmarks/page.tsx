"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// アイコンコンポーネント
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

const TrashIcon = () => (
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
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
)

const FolderIcon = () => (
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
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
)

const GridIcon = () => (
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
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
)

const ListIcon = () => (
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
        <line x1="8" x2="21" y1="6" y2="6" />
        <line x1="8" x2="21" y1="12" y2="12" />
        <line x1="8" x2="21" y1="18" y2="18" />
        <line x1="3" x2="3.01" y1="6" y2="6" />
        <line x1="3" x2="3.01" y1="12" y2="12" />
        <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
)

// モックデータ
const mockBookmarks = [
    {
        id: 1,
        novelId: 1,
        title: "異世界転生物語",
        author: "山田太郎",
        genre: "ファンタジー",
        coverImage: "/placeholder.svg?height=200&width=150",
        description: "平凡なサラリーマンが異世界に転生し、勇者として冒険を始める物語。",
        likes: 843,
        bookmarks: 256,
        views: 12500,
        updatedAt: "2023-11-20",
        bookmarkedAt: "2023-11-25T10:30:00Z",
        lastReadAt: "2023-11-25T15:45:00Z",
        progress: 75, // 読書進捗（パーセンテージ）
        tags: ["異世界", "転生", "ファンタジー", "冒険"],
    },
    {
        id: 2,
        novelId: 2,
        title: "現代恋愛物語",
        author: "佐藤花子",
        genre: "恋愛",
        coverImage: "/placeholder.svg?height=200&width=150",
        description: "都会で働くOLと隣の会社のイケメン社長の恋愛ストーリー。",
        likes: 567,
        bookmarks: 189,
        views: 8900,
        updatedAt: "2023-11-19",
        bookmarkedAt: "2023-11-24T14:20:00Z",
        lastReadAt: "2023-11-24T16:30:00Z",
        progress: 100, // 完読済み
        tags: ["恋愛", "現代", "OL", "社長"],
    },
    {
        id: 3,
        novelId: 3,
        title: "推理小説：謎の殺人事件",
        author: "田中次郎",
        genre: "ミステリー",
        coverImage: "/placeholder.svg?height=200&width=150",
        description: "閉鎖された山荘で起こった連続殺人事件の謎を解く推理小説。",
        likes: 432,
        bookmarks: 145,
        views: 6700,
        updatedAt: "2023-11-18",
        bookmarkedAt: "2023-11-23T09:15:00Z",
        lastReadAt: "2023-11-23T11:20:00Z",
        progress: 30,
        tags: ["推理", "ミステリー", "殺人", "謎"],
    },
    {
        id: 4,
        novelId: 4,
        title: "SF：未来都市の物語",
        author: "鈴木一郎",
        genre: "SF",
        coverImage: "/placeholder.svg?height=200&width=150",
        description: "2150年の未来都市で起こるサイバーパンクな物語。",
        likes: 298,
        bookmarks: 98,
        views: 4500,
        updatedAt: "2023-11-17",
        bookmarkedAt: "2023-11-22T20:45:00Z",
        lastReadAt: "2023-11-22T22:10:00Z",
        progress: 50,
        tags: ["SF", "未来", "サイバーパンク", "都市"],
    },
    {
        id: 5,
        novelId: 5,
        title: "歴史小説：戦国の英雄",
        author: "高橋美咲",
        genre: "歴史",
        coverImage: "/placeholder.svg?height=200&width=150",
        description: "戦国時代を舞台にした武将の物語。",
        likes: 345,
        bookmarks: 112,
        views: 5200,
        updatedAt: "2023-11-16",
        bookmarkedAt: "2023-11-21T13:30:00Z",
        lastReadAt: "2023-11-21T15:45:00Z",
        progress: 0, // 未読
        tags: ["歴史", "戦国", "武将", "時代劇"],
    },
]

const genres = ["すべて", "ファンタジー", "恋愛", "ミステリー", "SF", "歴史", "ホラー", "コメディ", "アクション"]

export default function BookmarksPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("すべて")
    const [sortBy, setSortBy] = useState("bookmarkedAt")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [bookmarks, setBookmarks] = useState(mockBookmarks)

    // フィルタリングとソート
    const filteredBookmarks = bookmarks
        .filter((bookmark) => {
            const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bookmark.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bookmark.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesGenre = selectedGenre === "すべて" || bookmark.genre === selectedGenre
            return matchesSearch && matchesGenre
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "title":
                    return a.title.localeCompare(b.title)
                case "author":
                    return a.author.localeCompare(b.author)
                case "updatedAt":
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                case "lastReadAt":
                    return new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
                case "bookmarkedAt":
                default:
                    return new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
            }
        })

    const removeBookmark = (id: number) => {
        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return "今"
        if (diffInHours < 24) return `${diffInHours}時間前`
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}日前`
        return date.toLocaleDateString("ja-JP", { month: "short", day: "numeric" })
    }

    const getProgressColor = (progress: number) => {
        if (progress === 100) return "#10B981" // 完読済み
        if (progress >= 50) return "#3B82F6" // 半分以上
        if (progress > 0) return "#F59E0B" // 少し読んだ
        return "#6B7280" // 未読
    }

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <BookmarkIcon />
                    <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>ブックマーク</h1>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                    お気に入りの作品を整理して、いつでも読み返せます
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
                            placeholder="作品名、作者名で検索..."
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
                        <option value="bookmarkedAt">ブックマーク日順</option>
                        <option value="lastReadAt">最終読書日順</option>
                        <option value="updatedAt">更新日順</option>
                        <option value="title">タイトル順</option>
                        <option value="author">作者順</option>
                    </select>

                    {/* ビューモード切り替え */}
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button
                            onClick={() => setViewMode("grid")}
                            style={{
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                                border: "1px solid var(--border-color)",
                                backgroundColor: viewMode === "grid" ? "var(--primary-color)" : "transparent",
                                color: viewMode === "grid" ? "white" : "inherit",
                                cursor: "pointer",
                            }}
                        >
                            <GridIcon />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            style={{
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                                border: "1px solid var(--border-color)",
                                backgroundColor: viewMode === "list" ? "var(--primary-color)" : "transparent",
                                color: viewMode === "list" ? "white" : "inherit",
                                cursor: "pointer",
                            }}
                        >
                            <ListIcon />
                        </button>
                    </div>
                </div>

                {/* 検索結果数 */}
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                    {filteredBookmarks.length}件のブックマークが見つかりました
                </p>
            </div>

            {/* ブックマーク一覧 */}
            {viewMode === "grid" ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {filteredBookmarks.map((bookmark) => (
                        <div
                            key={bookmark.id}
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
                            <Link href={`/novel/${bookmark.novelId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <div style={{ position: "relative" }}>
                                    <Image
                                        src={bookmark.coverImage}
                                        alt={bookmark.title}
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
                                        {bookmark.genre}
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "0.5rem",
                                            right: "0.5rem",
                                            backgroundColor: getProgressColor(bookmark.progress),
                                            color: "white",
                                            padding: "0.25rem 0.5rem",
                                            borderRadius: "0.25rem",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {bookmark.progress === 100 ? "完読" : `${bookmark.progress}%`}
                                    </div>
                                </div>

                                <div style={{ padding: "1rem" }}>
                                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                                        {bookmark.title}
                                    </h3>
                                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                                        {bookmark.author}
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
                                        {bookmark.description}
                                    </p>

                                    {/* タグ */}
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "1rem" }}>
                                        {bookmark.tags.slice(0, 3).map((tag) => (
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
                                                {bookmark.likes}
                                            </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                                <BookmarkIcon />
                                                {bookmark.bookmarks}
                                            </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                                <EyeIcon />
                                                {bookmark.views}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                            更新: {formatDate(bookmark.updatedAt)}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* 削除ボタン */}
                            <div style={{ padding: "0 1rem 1rem" }}>
                                <button
                                    onClick={() => removeBookmark(bookmark.id)}
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        borderRadius: "0.375rem",
                                        border: "1px solid var(--border-color)",
                                        backgroundColor: "transparent",
                                        color: "#EF4444",
                                        cursor: "pointer",
                                        fontSize: "0.875rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <TrashIcon />
                                    ブックマークから削除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {filteredBookmarks.map((bookmark) => (
                        <div
                            key={bookmark.id}
                            style={{
                                backgroundColor: "var(--bg-color)",
                                borderRadius: "0.5rem",
                                border: "1px solid var(--border-color)",
                                padding: "1rem",
                                display: "flex",
                                gap: "1rem",
                                alignItems: "flex-start",
                            }}
                        >
                            <Image
                                src={bookmark.coverImage}
                                alt={bookmark.title}
                                width={80}
                                height={120}
                                style={{ borderRadius: "0.25rem", flexShrink: 0 }}
                            />

                            <div style={{ flex: "1", minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", margin: 0 }}>
                                        <Link
                                            href={`/novel/${bookmark.novelId}`}
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            {bookmark.title}
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
                                        {bookmark.genre}
                                    </span>
                                    <span
                                        style={{
                                            backgroundColor: getProgressColor(bookmark.progress),
                                            color: "white",
                                            padding: "0.125rem 0.5rem",
                                            borderRadius: "0.25rem",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {bookmark.progress === 100 ? "完読" : `${bookmark.progress}%`}
                                    </span>
                                </div>

                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                                    {bookmark.author}
                                </p>

                                <p
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "var(--text-muted)",
                                        marginBottom: "1rem",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    {bookmark.description}
                                </p>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                            <HeartIcon />
                                            {bookmark.likes}
                                        </span>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                            <BookmarkIcon />
                                            {bookmark.bookmarks}
                                        </span>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                            <EyeIcon />
                                            {bookmark.views}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                            更新: {formatDate(bookmark.updatedAt)}
                                        </span>
                                        <button
                                            onClick={() => removeBookmark(bookmark.id)}
                                            style={{
                                                padding: "0.25rem 0.5rem",
                                                borderRadius: "0.25rem",
                                                border: "1px solid var(--border-color)",
                                                backgroundColor: "transparent",
                                                color: "#EF4444",
                                                cursor: "pointer",
                                                fontSize: "0.75rem",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.25rem",
                                            }}
                                        >
                                            <TrashIcon />
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ブックマークが空の場合 */}
            {filteredBookmarks.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <BookmarkIcon />
                    <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", marginTop: "1rem", marginBottom: "0.5rem" }}>
                        ブックマークはありません
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                        お気に入りの作品をブックマークして、いつでも読み返せます
                    </p>
                    <Link
                        href="/explore"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.375rem",
                            backgroundColor: "var(--primary-color)",
                            color: "white",
                            textDecoration: "none",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                        }}
                    >
                        <FolderIcon />
                        作品を探す
                    </Link>
                </div>
            )}
        </div>
    )
} 