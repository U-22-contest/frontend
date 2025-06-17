"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// アイコンコンポーネント

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

const UsersIcon = () => (
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m22 21-2-2" />
        <path d="M16 16h6" />
    </svg>
)

const EditIcon = () => (
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
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
    </svg>
)

const PlusIcon = () => (
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
        <path d="M5 12h14" />
        <path d="M12 5v14" />
    </svg>
)

// モックデータ
const mockUser = {
    id: "user123",
    username: "yamada123",
    displayName: "山田太郎",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "ファンタジー小説を書いている作家です。異世界転生ものが好きで、読者の皆さんに楽しんでもらえる物語を心がけています。",
    joinDate: "2023-01-15",
    location: "東京都",
    website: "https://yamada-writer.com",
    followers: 1234,
    following: 567,
    totalLikes: 8900,
    totalViews: 156000,
}

const mockNovels = [
    {
        id: 1,
        title: "異世界転生物語",
        genre: "ファンタジー",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 843,
        bookmarks: 256,
        views: 12500,
        updatedAt: "2023-11-20",
        status: "連載中",
        chapters: 15,
    },
    {
        id: 2,
        title: "現代恋愛物語",
        genre: "恋愛",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 567,
        bookmarks: 189,
        views: 8900,
        updatedAt: "2023-11-19",
        status: "完結",
        chapters: 8,
    },
    {
        id: 3,
        title: "推理小説：謎の殺人事件",
        genre: "ミステリー",
        coverImage: "/placeholder.svg?height=200&width=150",
        likes: 432,
        bookmarks: 145,
        views: 6700,
        updatedAt: "2023-11-18",
        status: "連載中",
        chapters: 12,
    },
]

const mockFollowers = [
    {
        id: "follower1",
        username: "sato123",
        displayName: "佐藤花子",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "恋愛小説が好きな読者です。",
        isFollowing: true,
    },
    {
        id: "follower2",
        username: "tanaka456",
        displayName: "田中次郎",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "ミステリー小説を書いています。",
        isFollowing: false,
    },
    {
        id: "follower3",
        username: "suzuki789",
        displayName: "鈴木一郎",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "SF小説が専門です。",
        isFollowing: true,
    },
]

const mockFollowing = [
    {
        id: "following1",
        username: "takahashi123",
        displayName: "高橋美咲",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "歴史小説を書いています。",
        isFollowing: true,
    },
    {
        id: "following2",
        username: "ito456",
        displayName: "伊藤恵子",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "ホラー小説が専門です。",
        isFollowing: true,
    },
]

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("novels")
    const [isEditing, setIsEditing] = useState(false)
    const [user] = useState(mockUser)

    const handleFollow = (userId: string) => {
        // フォロー/アンフォロー処理
        console.log("Follow/Unfollow:", userId)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })
    }

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M"
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K"
        }
        return num.toString()
    }

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
            {/* プロフィールヘッダー */}
            <div
                style={{
                    backgroundColor: "var(--bg-color)",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--border-color)",
                    padding: "2rem",
                    marginBottom: "2rem",
                }}
            >
                <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                    {/* アバター */}
                    <div style={{ flexShrink: 0 }}>
                        <Image
                            src={user.avatar}
                            alt={user.displayName}
                            width={120}
                            height={120}
                            style={{ borderRadius: "50%" }}
                        />
                    </div>

                    {/* プロフィール情報 */}
                    <div style={{ flex: "1", minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                            <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
                                {user.displayName}
                            </h1>
                            <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                                @{user.username}
                            </span>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                style={{
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.375rem",
                                    border: "1px solid var(--border-color)",
                                    backgroundColor: "transparent",
                                    color: "var(--text-color)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontSize: "0.875rem",
                                }}
                            >
                                <EditIcon />
                                編集
                            </button>
                        </div>

                        <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: "1.6" }}>
                            {user.bio}
                        </p>

                        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                            {user.location && (
                                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                    📍 {user.location}
                                </span>
                            )}
                            {user.website && (
                                <a
                                    href={user.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: "var(--primary-color)",
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.25rem",
                                    }}
                                >
                                    🌐 ウェブサイト
                                </a>
                            )}
                            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                📅 {formatDate(user.joinDate)}から参加
                            </span>
                        </div>

                        {/* 統計情報 */}
                        <div style={{ display: "flex", gap: "2rem", fontSize: "0.875rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <UsersIcon />
                                <span>
                                    <strong>{formatNumber(user.followers)}</strong> フォロワー
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <UsersIcon />
                                <span>
                                    <strong>{formatNumber(user.following)}</strong> フォロー中
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <HeartIcon />
                                <span>
                                    <strong>{formatNumber(user.totalLikes)}</strong> いいね
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <EyeIcon />
                                <span>
                                    <strong>{formatNumber(user.totalViews)}</strong> 閲覧数
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* タブナビゲーション */}
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border-color)" }}>
                    <button
                        onClick={() => setActiveTab("novels")}
                        style={{
                            padding: "1rem 1.5rem",
                            border: "none",
                            backgroundColor: "transparent",
                            color: activeTab === "novels" ? "var(--primary-color)" : "var(--text-muted)",
                            cursor: "pointer",
                            fontWeight: activeTab === "novels" ? "600" : "400",
                            borderBottom: activeTab === "novels" ? "2px solid var(--primary-color)" : "2px solid transparent",
                        }}
                    >
                        作品 ({mockNovels.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("followers")}
                        style={{
                            padding: "1rem 1.5rem",
                            border: "none",
                            backgroundColor: "transparent",
                            color: activeTab === "followers" ? "var(--primary-color)" : "var(--text-muted)",
                            cursor: "pointer",
                            fontWeight: activeTab === "followers" ? "600" : "400",
                            borderBottom: activeTab === "followers" ? "2px solid var(--primary-color)" : "2px solid transparent",
                        }}
                    >
                        フォロワー ({mockFollowers.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("following")}
                        style={{
                            padding: "1rem 1.5rem",
                            border: "none",
                            backgroundColor: "transparent",
                            color: activeTab === "following" ? "var(--primary-color)" : "var(--text-muted)",
                            cursor: "pointer",
                            fontWeight: activeTab === "following" ? "600" : "400",
                            borderBottom: activeTab === "following" ? "2px solid var(--primary-color)" : "2px solid transparent",
                        }}
                    >
                        フォロー中 ({mockFollowing.length})
                    </button>
                </div>
            </div>

            {/* タブコンテンツ */}
            {activeTab === "novels" && (
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>作品一覧</h2>
                        <Link
                            href="/novel/create"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                backgroundColor: "var(--primary-color)",
                                color: "white",
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                            }}
                        >
                            <PlusIcon />
                            新しい作品を作成
                        </Link>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                        {mockNovels.map((novel) => (
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
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "0.5rem",
                                                right: "0.5rem",
                                                backgroundColor: novel.status === "連載中" ? "#10B981" : "#6B7280",
                                                color: "white",
                                                padding: "0.25rem 0.5rem",
                                                borderRadius: "0.25rem",
                                                fontSize: "0.75rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {novel.status}
                                        </div>
                                    </div>

                                    <div style={{ padding: "1rem" }}>
                                        <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                                            {novel.title}
                                        </h3>
                                        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                            {novel.chapters}章 • 更新: {novel.updatedAt}
                                        </p>

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
                                                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                                    <EyeIcon />
                                                    {novel.views}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "followers" && (
                <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>フォロワー</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {mockFollowers.map((follower) => (
                            <div
                                key={follower.id}
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
                                <Image
                                    src={follower.avatar}
                                    alt={follower.displayName}
                                    width={48}
                                    height={48}
                                    style={{ borderRadius: "50%" }}
                                />
                                <div style={{ flex: "1", minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                                        <h3 style={{ fontSize: "1rem", fontWeight: "600", margin: 0 }}>
                                            {follower.displayName}
                                        </h3>
                                        <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                                            @{follower.username}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
                                        {follower.bio}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleFollow(follower.id)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        borderRadius: "0.375rem",
                                        border: "1px solid var(--border-color)",
                                        backgroundColor: follower.isFollowing ? "transparent" : "var(--primary-color)",
                                        color: follower.isFollowing ? "var(--text-color)" : "white",
                                        cursor: "pointer",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    {follower.isFollowing ? "フォロー中" : "フォロー"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "following" && (
                <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>フォロー中</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {mockFollowing.map((following) => (
                            <div
                                key={following.id}
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
                                <Image
                                    src={following.avatar}
                                    alt={following.displayName}
                                    width={48}
                                    height={48}
                                    style={{ borderRadius: "50%" }}
                                />
                                <div style={{ flex: "1", minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                                        <h3 style={{ fontSize: "1rem", fontWeight: "600", margin: 0 }}>
                                            {following.displayName}
                                        </h3>
                                        <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                                            @{following.username}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
                                        {following.bio}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleFollow(following.id)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        borderRadius: "0.375rem",
                                        border: "1px solid var(--border-color)",
                                        backgroundColor: "transparent",
                                        color: "var(--text-color)",
                                        cursor: "pointer",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    フォロー中
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 