"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// 文を分割する関数
function splitIntoSentences(text: string): string[] {
  // 簡易的な文分割（実際の実装ではより堅牢な方法が必要）
  return text
    .split("\n")
    .filter((line) => line.trim())
    .flatMap((paragraph) => {
      // 会話文は分割しない
      if (paragraph.trim().startsWith("「") && paragraph.trim().endsWith("」")) {
        return [paragraph.trim()]
      }

      // それ以外は句点で分割
      return paragraph
        .split("。")
        .map((s) => s.trim())
        .filter((s) => s)
        .map((s) => s + "。")
    })
}

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

const ShareIcon = () => (
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
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const SunIcon = () => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
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
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

const TypeIcon = () => (
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
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" x2="15" y1="20" y2="20" />
    <line x1="12" x2="12" y1="4" y2="20" />
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

const EyeOffIcon = () => (
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
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
)

const MaximizeIcon = () => (
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
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" x2="14" y1="3" y2="10" />
    <line x1="3" x2="10" y1="21" y2="14" />
  </svg>
)

const MinimizeIcon = () => (
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
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" x2="21" y1="10" y2="3" />
    <line x1="3" x2="10" y1="21" y2="14" />
  </svg>
)

const ChevronLeftIcon = () => (
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
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRightIcon = () => (
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
    <path d="m9 18 6-6-6-6" />
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

const HelpCircleIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
)

const ThumbsUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
)

const SendIcon = () => (
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
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

// Avatar コンポーネント
const Avatar = ({
  src,
  alt,
  fallback,
  size = "medium",
}: { src: string; alt: string; fallback: string; size?: "small" | "medium" | "large" }) => {
  const sizeStyles = {
    small: { width: "24px", height: "24px", fontSize: "12px" },
    medium: { width: "40px", height: "40px", fontSize: "16px" },
    large: { width: "64px", height: "64px", fontSize: "24px" },
  }

  const [imgError, setImgError] = useState(false)

  return (
    <div
      style={{
        ...sizeStyles[size],
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {!imgError ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes={`${Number.parseInt(sizeStyles[size].width)}px`}
          style={{ objectFit: "cover" }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 500,
            color: "#64748b",
          }}
        >
          {fallback}
        </div>
      )}
    </div>
  )
}

// ボタンコンポーネント
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "medium",
  disabled = false,
  style = {},
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "small" | "medium" | "large"
  disabled?: boolean
  style?: React.CSSProperties
}) => {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.375rem",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background-color 0.2s, border-color 0.2s, color 0.2s",
  }

  const sizeStyles = {
    small: { padding: "0.25rem 0.5rem", fontSize: "0.75rem", height: "1.75rem" },
    medium: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2.25rem" },
    large: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.75rem" },
  }

  const variantStyles = {
    default: {
      backgroundColor: "#0070f3",
      color: "white",
      border: "1px solid transparent",
    },
    outline: {
      backgroundColor: "transparent",
      color: "currentColor",
      border: "1px solid #d1d5db",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "currentColor",
      border: "1px solid transparent",
    },
  }

  const hoverStyles = {
    default: { backgroundColor: "#0060df" },
    outline: { backgroundColor: "rgba(0, 0, 0, 0.05)" },
    ghost: { backgroundColor: "rgba(0, 0, 0, 0.05)" },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      onMouseOver={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, hoverStyles[variant])
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, variantStyles[variant])
        }
      }}
    >
      {children}
    </button>
  )
}

// ツールチップコンポーネント
const Tooltip = ({
  children,
  content,
  side = "top",
}: { children: React.ReactNode; content: React.ReactNode; side?: "top" | "right" | "bottom" | "left" }) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const positions = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "0.5rem" },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "0.5rem" },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "0.5rem" },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "0.5rem" },
  }

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            zIndex: 50,
            backgroundColor: "#333",
            color: "white",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.875rem",
            maxWidth: "20rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            ...positions[side],
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}

// ダイアログコンポーネント
const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
}) => {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "85vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{title}</h2>
            {description && <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{description}</p>}
          </div>
        )}
        <div>{children}</div>
        {footer && <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>{footer}</div>}
      </div>
    </div>
  )
}

// タブコンポーネント
interface TabTriggerProps {
  value: string
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  isActive?: boolean
}

interface TabsListProps {
  children: React.ReactNode
}

const Tabs = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode
  defaultValue: string
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  // タブの子要素を処理
  const tabTriggers: React.ReactElement[] = []
  const tabContents: React.ReactElement[] = []

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<TabsListProps>(child)) {
      if (child.type === TabsList) {
        // TabsListの子要素（TabTrigger）を処理
        const triggers = React.Children.map(child.props.children, (trigger) => {
          if (React.isValidElement<TabTriggerProps>(trigger) && trigger.type === TabTrigger) {
            return React.cloneElement(trigger, {
              isActive: trigger.props.value === activeTab,
              onClick: () => setActiveTab(trigger.props.value),
            })
          }
          return trigger
        })
        tabTriggers.push(React.cloneElement(child, {}, triggers))
      } else if (React.isValidElement<TabsContentProps>(child) && child.type === TabsContent) {
        // TabsContentを処理
        tabContents.push(
          React.cloneElement(child, {
            isActive: child.props.value === activeTab,
          }),
        )
      }
    }
  })

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {tabTriggers}
      {tabContents}
    </div>
  )
}

const TabsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #e2e8f0",
        marginBottom: "1rem",
      }}
    >
      {children}
    </div>
  )
}

const TabTrigger = ({
  children,
  value,
  isActive,
  onClick,
}: {
  children: React.ReactNode
  value: string
  isActive?: boolean
  onClick?: () => void
}) => {
  return (
    <button
      style={{
        padding: "0.5rem 1rem",
        fontWeight: 500,
        borderBottom: isActive ? "2px solid #0070f3" : "2px solid transparent",
        color: isActive ? "#0070f3" : "inherit",
        cursor: "pointer",
        background: "none",
        border: "none",
        outline: "none",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const TabsContent = ({
  children,
  value,
  isActive,
}: {
  children: React.ReactNode
  value: string
  isActive?: boolean
}) => {
  if (!isActive) return null
  return <div>{children}</div>
}

// テキストエリアコンポーネント
const Textarea = ({
  value,
  onChange,
  placeholder,
  style = {},
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  style?: React.CSSProperties
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "0.5rem",
        borderRadius: "0.375rem",
        border: "1px solid #d1d5db",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        resize: "vertical",
        minHeight: "100px",
        ...style,
      }}
    />
  )
}

// 小説のモックデータ
const novelData = {
  id: 1,
  title: "異世界転生物語",
  author: "山田太郎",
  authorId: "yamada123",
  genre: "ファンタジー",
  views: 12500,
  likes: 843,
  bookmarks: 256,
  publishedAt: "2023-10-15",
  updatedAt: "2023-11-20",
  chapters: [
    { id: 1, title: "第1章: 異世界への扉", published: true },
    { id: 2, title: "第2章: 新たな冒険の始まり", published: true },
    { id: 3, title: "第3章: 仲間との出会い", published: true },
    { id: 4, title: "第4章: 最初の試練", published: false },
  ],
  content: `
    「これは、一体どこだ？」

    目を覚ますと、そこは見知らぬ森の中だった。高い木々が空を覆い、木漏れ日が地面に模様を描いている。昨日までオフィスで残業していたはずなのに、気がつけば異世界らしき場所に立っていた。

    私の名前は佐藤健太、27歳の平凡なサラリーマンだ。特別な才能もなく、特別な人生を送ってきたわけでもない。そんな私がなぜこんな場所にいるのか、まったく見当がつかなかった。

    「とりあえず、このままじゃ何も始まらない」

    私は立ち上がり、辺りを見回した。どの方向に進めばいいのか分からなかったが、一番光が差し込んでいる方向に歩き始めた。

    森の中を歩くこと約1時間。ようやく開けた場所に出ると、そこには小さな村が見えた。中世ヨーロッパを思わせる石造りの家々と、行き交う人々の服装。どう見ても現代の日本ではない。

    「やはり異世界か...」

    村の入り口に立つと、不思議そうな目で見られた。当然だろう、この世界の服装とはかけ離れたスーツ姿なのだから。

    「おや、珍しい服装の方だね。どちらからいらしたのかな？」

    声をかけてきたのは、年配の男性だった。白髪交じりの髪に優しい表情。村の長のような雰囲気を漂わせている。

    「実は...どこからきたのか、自分でもよく分からないんです」

    正直に答えると、男性は驚いた様子で私を見つめた。

    「記憶喪失か...それとも召喚された者か。いずれにせよ、まずは休むといい。私の家においで」

    男性の名前はガルム。この村の長老だという。彼の家で暖かい食事をいただきながら、この世界のことを少しずつ教えてもらった。

    ここはアルテミア大陸の小さな村、ウィンドベルという場所。魔法が存在し、モンスターが出没する、まさに異世界ファンタジーそのものの世界だった。

    「それにしても、健太くんは特別な雰囲気を持っているね」

    ガルムはそう言って、私の右手を指さした。気づくと、手の甲に見覚えのない紋章のようなものが浮かび上がっていた。青く光る三角形の紋章。

    「これは...勇者の証だ！」

    ガルムの声が震えた。どうやら私は、この世界を救うために召喚された「勇者」らしい。平凡だったはずの人生が、一変する瞬間だった。
  `,
  comments: [
    {
      id: 1,
      user: { name: "読者A", avatar: "/placeholder.svg?height=40&width=40" },
      text: "主人公の心情描写がとても良いです！続きが楽しみです。",
      likes: 12,
      createdAt: "2023-11-21T10:30:00Z",
    },
    {
      id: 2,
      user: { name: "読者B", avatar: "/placeholder.svg?height=40&width=40" },
      text: "異世界ものですが、新鮮な設定が面白いです。",
      likes: 8,
      createdAt: "2023-11-22T14:15:00Z",
    },
  ],
  // 文単位のコメントを追加
  sentenceComments: [
    {
      id: 1,
      sentenceIndex: 3, // 「目を覚ますと、そこは見知らぬ森の中だった。」
      user: { name: "読者C", avatar: "/placeholder.svg?height=40&width=40" },
      text: "この森の描写がもう少し詳しいと雰囲気が伝わりそうです！",
      likes: 5,
      createdAt: "2023-11-23T09:15:00Z",
    },
    {
      id: 2,
      sentenceIndex: 15, // 「やはり異世界か...」
      user: { name: "読者D", avatar: "/placeholder.svg?height=40&width=40" },
      text: "ここでの主人公の冷静さが印象的です。パニックにならないのが面白い！",
      likes: 7,
      createdAt: "2023-11-24T11:20:00Z",
    },
    {
      id: 3,
      sentenceIndex: 25, // 「ここはアルテミア大陸の小さな村、ウィンドベルという場所。」
      user: { name: "読者E", avatar: "/placeholder.svg?height=40&width=40" },
      text: "この世界の名前が素敵です。アルテミアという名前にはどんな由来があるのでしょうか？",
      likes: 3,
      createdAt: "2023-11-25T14:30:00Z",
    },
  ],
}

export default function NovelPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [novel, setNovel] = useState(novelData)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isAsking, setIsAsking] = useState(false)

  useEffect(() => {
    console.log("Novel ID:", params.id)
    console.log("Current URL:", window.location.pathname)
    setLoading(false)
  }, [params.id])

  const handleAskQuestion = async () => {
    if (!question.trim()) return

    setIsAsking(true)
    try {
      // 実際のアプリではAPIを呼び出す
      // const response = await askAboutStory(params.id as string, question)
      // setAnswer(response.answer)

      // モックレスポンス
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAnswer(
        `「${question}」についての回答です。この物語では、主人公の佐藤健太が異世界に召喚され、「勇者の証」と呼ばれる青い三角形の紋章を持つことで、この世界を救う使命を持つことになります。`,
      )
    } catch (error) {
      console.error("質問の処理中にエラーが発生しました:", error)
      setAnswer("申し訳ありません。質問の処理中にエラーが発生しました。")
    } finally {
      setIsAsking(false)
    }
  }

  if (loading) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem", textAlign: "center" }}>
        <p>読み込み中...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
            color: "var(--text-muted)",
            textDecoration: "none",
          }}
        >
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          ホームに戻る
        </Link>

        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{novel.title}</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <Link
            href={`/author/${novel.authorId}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "9999px",
                backgroundColor: "var(--bg-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
              }}
            >
              {novel.author[0]}
            </div>
            <span style={{ fontWeight: 500 }}>{novel.author}</span>
          </Link>
          <span style={{ color: "var(--text-muted)" }}>
            {novel.genre} • 更新: {novel.updatedAt}
          </span>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid var(--border-color)",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
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
            <span>いいね {novel.likes}</span>
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid var(--border-color)",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
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
            <span>ブックマーク {novel.bookmarks}</span>
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "2rem" }}>
        <div>
          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.8,
                fontSize: "1.125rem",
              }}
            >
              {novel.content}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>AIに質問する</h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>物語の内容について質問できます</p>
            </div>

            <div style={{ padding: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="例: 「勇者の証」とは何ですか？"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-color)",
                    minHeight: "100px",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                onClick={handleAskQuestion}
                disabled={isAsking || !question.trim()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--primary-color)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  cursor: isAsking || !question.trim() ? "not-allowed" : "pointer",
                  opacity: isAsking || !question.trim() ? 0.5 : 1,
                }}
              >
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                {isAsking ? "処理中..." : "質問する"}
              </button>

              {answer && (
                <div
                  style={{
                    marginTop: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "var(--bg-muted)",
                    borderRadius: "0.375rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {answer}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
              position: "sticky",
              top: "1.25rem",
            }}
          >
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>章一覧</h2>
            </div>

            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {novel.chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem",
                      border: "1px solid var(--border-color)",
                      borderRadius: "0.375rem",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--bg-muted)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{chapter.title}</span>
                    {chapter.published ? (
                      <Link
                        href={`/novel/${novel.id}/chapter/${chapter.id}`}
                        style={{
                          textDecoration: "none",
                          color: "var(--primary-color)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        読む
                      </Link>
                    ) : (
                      <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>準備中</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
