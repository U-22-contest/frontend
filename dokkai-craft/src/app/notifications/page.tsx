"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// アイコンコンポーネント
const BellIcon = () => (
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
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
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

const MessageSquareIcon = () => (
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)

const BookOpenIcon = () => (
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
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
)

const StarIcon = () => (
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
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

const SettingsIcon = () => (
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
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const CheckIcon = () => (
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
        <polyline points="20,6 9,17 4,12" />
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

// 通知タイプの定義
type NotificationType = "like" | "comment" | "follow" | "update" | "system"

interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    isRead: boolean
    createdAt: string
    user?: {
        name: string
        avatar: string
    }
    novel?: {
        id: number
        title: string
    }
    actionUrl?: string
}

// モックデータ
const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "like",
        title: "いいね通知",
        message: "田中次郎さんがあなたの作品「異世界転生物語」にいいねしました",
        isRead: false,
        createdAt: "2023-11-25T10:30:00Z",
        user: {
            name: "田中次郎",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        novel: {
            id: 1,
            title: "異世界転生物語",
        },
        actionUrl: "/novel/1",
    },
    {
        id: "2",
        type: "comment",
        title: "コメント通知",
        message: "佐藤花子さんがあなたの作品にコメントしました：「素晴らしい物語ですね！続きが楽しみです。」",
        isRead: false,
        createdAt: "2023-11-25T09:15:00Z",
        user: {
            name: "佐藤花子",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        novel: {
            id: 1,
            title: "異世界転生物語",
        },
        actionUrl: "/novel/1",
    },
    {
        id: "3",
        type: "follow",
        title: "フォロー通知",
        message: "鈴木一郎さんがあなたをフォローしました",
        isRead: true,
        createdAt: "2023-11-24T16:45:00Z",
        user: {
            name: "鈴木一郎",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        actionUrl: "/profile/suzuki123",
    },
    {
        id: "4",
        type: "update",
        title: "更新通知",
        message: "フォローしている作者「高橋美咲」さんが「歴史小説：戦国の英雄」を更新しました",
        isRead: true,
        createdAt: "2023-11-24T14:20:00Z",
        user: {
            name: "高橋美咲",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        novel: {
            id: 5,
            title: "歴史小説：戦国の英雄",
        },
        actionUrl: "/novel/5",
    },
    {
        id: "5",
        type: "system",
        title: "システム通知",
        message: "アカウントのセキュリティを向上させるため、パスワードの変更をお勧めします",
        isRead: false,
        createdAt: "2023-11-24T12:00:00Z",
        actionUrl: "/settings/security",
    },
    {
        id: "6",
        type: "like",
        title: "いいね通知",
        message: "伊藤恵子さんがあなたの作品「異世界転生物語」にいいねしました",
        isRead: true,
        createdAt: "2023-11-23T20:30:00Z",
        user: {
            name: "伊藤恵子",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        novel: {
            id: 1,
            title: "異世界転生物語",
        },
        actionUrl: "/novel/1",
    },
]

const notificationTypes = [
    { key: "all", label: "すべて", icon: BellIcon },
    { key: "like", label: "いいね", icon: HeartIcon },
    { key: "comment", label: "コメント", icon: MessageSquareIcon },
    { key: "follow", label: "フォロー", icon: BookOpenIcon },
    { key: "update", label: "更新", icon: StarIcon },
    { key: "system", label: "システム", icon: SettingsIcon },
]

export default function NotificationsPage() {
    const [selectedType, setSelectedType] = useState("all")
    const [notifications, setNotifications] = useState(mockNotifications)

    const getNotificationIcon = (type: NotificationType) => {
        switch (type) {
            case "like":
                return <HeartIcon />
            case "comment":
                return <MessageSquareIcon />
            case "follow":
                return <BookOpenIcon />
            case "update":
                return <StarIcon />
            case "system":
                return <SettingsIcon />
            default:
                return <BellIcon />
        }
    }

    const getNotificationColor = (type: NotificationType) => {
        switch (type) {
            case "like":
                return "#EF4444"
            case "comment":
                return "#3B82F6"
            case "follow":
                return "#10B981"
            case "update":
                return "#F59E0B"
            case "system":
                return "#6B7280"
            default:
                return "#6B7280"
        }
    }

    const filteredNotifications = notifications.filter((notification) => {
        if (selectedType === "all") return true
        return notification.type === selectedType
    })

    const unreadCount = notifications.filter((n) => !n.isRead).length

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        )
    }

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({ ...notification, isRead: true }))
        )
    }

    const deleteNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

        if (diffInMinutes < 1) return "今"
        if (diffInMinutes < 60) return `${diffInMinutes}分前`
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
        return `${Math.floor(diffInMinutes / 1440)}日前`
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem" }}>
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <BellIcon />
                        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>通知</h1>
                        {unreadCount > 0 && (
                            <span
                                style={{
                                    backgroundColor: "var(--primary-color)",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "1.5rem",
                                    height: "1.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.75rem",
                                    fontWeight: "bold",
                                }}
                            >
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            border: "1px solid var(--border-color)",
                            backgroundColor: "transparent",
                            color: "var(--text-color)",
                            cursor: unreadCount === 0 ? "not-allowed" : "pointer",
                            opacity: unreadCount === 0 ? 0.5 : 1,
                            fontSize: "0.875rem",
                        }}
                    >
                        すべて既読にする
                    </button>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                    あなたの活動に関する最新の通知をお届けします
                </p>
            </div>

            {/* 通知タイプフィルター */}
            <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {notificationTypes.map((type) => {
                        const Icon = type.icon
                        return (
                            <button
                                key={type.key}
                                onClick={() => setSelectedType(type.key)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.375rem",
                                    border: "1px solid var(--border-color)",
                                    backgroundColor: selectedType === type.key ? "var(--primary-color)" : "transparent",
                                    color: selectedType === type.key ? "white" : "inherit",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                }}
                            >
                                <Icon />
                                {type.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* 通知一覧 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {filteredNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            backgroundColor: "var(--bg-color)",
                            borderRadius: "0.5rem",
                            border: "1px solid var(--border-color)",
                            padding: "1rem",
                            opacity: notification.isRead ? 0.7 : 1,
                            position: "relative",
                        }}
                    >
                        {!notification.isRead && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "1rem",
                                    right: "1rem",
                                    width: "0.5rem",
                                    height: "0.5rem",
                                    backgroundColor: "var(--primary-color)",
                                    borderRadius: "50%",
                                }}
                            />
                        )}

                        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                            {/* 通知アイコン */}
                            <div
                                style={{
                                    width: "2.5rem",
                                    height: "2.5rem",
                                    borderRadius: "50%",
                                    backgroundColor: getNotificationColor(notification.type) + "20",
                                    color: getNotificationColor(notification.type),
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                {getNotificationIcon(notification.type)}
                            </div>

                            {/* 通知内容 */}
                            <div style={{ flex: "1", minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                    <h3 style={{ fontSize: "1rem", fontWeight: "600", margin: 0 }}>
                                        {notification.title}
                                    </h3>
                                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                        {formatTime(notification.createdAt)}
                                    </span>
                                </div>

                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem", lineHeight: "1.5" }}>
                                    {notification.message}
                                </p>

                                {/* ユーザー情報 */}
                                {notification.user && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                        <Image
                                            src={notification.user.avatar}
                                            alt={notification.user.name}
                                            width={24}
                                            height={24}
                                            style={{ borderRadius: "50%" }}
                                        />
                                        <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                                            {notification.user.name}
                                        </span>
                                    </div>
                                )}

                                {/* アクションボタン */}
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    {notification.actionUrl && (
                                        <Link
                                            href={notification.actionUrl}
                                            style={{
                                                padding: "0.25rem 0.75rem",
                                                borderRadius: "0.25rem",
                                                backgroundColor: "var(--primary-color)",
                                                color: "white",
                                                textDecoration: "none",
                                                fontSize: "0.75rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            詳細を見る
                                        </Link>
                                    )}
                                    {!notification.isRead && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            style={{
                                                padding: "0.25rem 0.75rem",
                                                borderRadius: "0.25rem",
                                                border: "1px solid var(--border-color)",
                                                backgroundColor: "transparent",
                                                color: "var(--text-color)",
                                                cursor: "pointer",
                                                fontSize: "0.75rem",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.25rem",
                                            }}
                                        >
                                            <CheckIcon />
                                            既読にする
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        style={{
                                            padding: "0.25rem 0.75rem",
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

            {/* 通知が空の場合 */}
            {filteredNotifications.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <BellIcon />
                    <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", marginTop: "1rem", marginBottom: "0.5rem" }}>
                        通知はありません
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                        新しい通知があるとここに表示されます
                    </p>
                </div>
            )}
        </div>
    )
} 