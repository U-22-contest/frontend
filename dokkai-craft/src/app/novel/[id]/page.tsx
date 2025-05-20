"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"

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
      }}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = "none";
          const nextSibling = target.nextElementSibling as HTMLDivElement;
          if (nextSibling) {
            nextSibling.style.display = "flex";
          }
        }}
      />
      <div
        style={{
          display: "none",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 500,
          color: "#64748b",
        }}
      >
        {fallback}
      </div>
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

// 型定義を追加
interface TabTriggerProps {
  value: string;
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  isActive?: boolean;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

// タブコンポーネント
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
    if (React.isValidElement(child)) {
      if (child.type === TabsList) {
        const listProps = child.props as TabsListProps;
        const triggers = React.Children.map(listProps.children, (trigger) => {
          if (React.isValidElement(trigger) && trigger.type === TabTrigger) {
            const triggerProps = trigger.props as TabTriggerProps;
            return React.cloneElement(trigger, {
              isActive: triggerProps.value === activeTab,
              onClick: () => setActiveTab(triggerProps.value),
            } as Partial<TabTriggerProps>);
          }
          return trigger;
        });
        tabTriggers.push(React.cloneElement(child, {}, triggers));
      } else if (child.type === TabsContent) {
        const contentProps = child.props as TabsContentProps;
        tabContents.push(
          React.cloneElement(child, {
            isActive: contentProps.value === activeTab,
          } as Partial<TabsContentProps>)
        );
      }
    }
  });

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

export default function NovelPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [commentText, setCommentText] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isAiLoading, setIsAiLoading] = useState(false)

  // 新しい状態
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showComments, setShowComments] = useState(true)
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<number | null>(null)
  const [sentenceCommentText, setSentenceCommentText] = useState("")
  const [theme, setTheme] = useState<"light" | "dark" | "sepia">("light")
  const [isVerticalMode, setIsVerticalMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  // ダイアログの状態
  const [isSentenceCommentDialogOpen, setIsSentenceCommentDialogOpen] = useState(false)
  const [isTextCommentDialogOpen, setIsTextCommentDialogOpen] = useState(false)
  const [isAiQuestionDialogOpen, setIsAiQuestionDialogOpen] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const sentences = splitIntoSentences(novelData.content)

  // 縦書きモードでのページ数を計算
  const [totalPages, setTotalPages] = useState(1)
  const contentContainerRef = useRef<HTMLDivElement>(null)

  // テーマの適用
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  // 縦書きモードでのページ計算
  useEffect(() => {
    if (isVerticalMode && contentContainerRef.current) {
      const containerWidth = contentContainerRef.current.clientWidth
      const contentWidth = contentRef.current?.scrollWidth || 0
      const pages = Math.ceil(contentWidth / containerWidth)
      setTotalPages(Math.max(1, pages))

      // ページ変更時にスクロール位置を調整
      if (contentRef.current) {
        const scrollAmount = currentPage * containerWidth
        contentRef.current.scrollLeft = scrollAmount
      }
    } else {
      setTotalPages(1)
      setCurrentPage(0)
    }
  }, [isVerticalMode, currentPage, isFullscreen])

  // 次のページへ
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  // 前のページへ
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // フルスクリーン切り替え
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`フルスクリーンモードに切り替えられませんでした: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // フルスクリーン状態の監視
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // テキスト選択を処理
  const handleTextSelect = () => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      setSelectedText(selection.toString())
    }
  }

  // 文をクリックしたときの処理
  const handleSentenceClick = (index: number) => {
    setSelectedSentenceIndex(index)
  }

  // 文へのコメントを投稿
  const postSentenceComment = () => {
    if (!sentenceCommentText.trim() || selectedSentenceIndex === null) {
      alert("コメントを入力してください。")
      return
    }

    // 実際の実装ではバックエンドにデータを送信
    alert("コメントが投稿されました")
    setSentenceCommentText("")
    setSelectedSentenceIndex(null)
    setIsSentenceCommentDialogOpen(false)
  }

  // コメントを投稿
  const postComment = () => {
    if (!commentText.trim()) {
      alert("コメントを入力してください。")
      return
    }

    // 実際の実装ではバックエンドにデータを送信
    alert("コメントが投稿されました")
    setCommentText("")
    setIsTextCommentDialogOpen(false)
  }

  // AIに質問
  const askAI = async () => {
    if (!questionText.trim()) {
      alert("質問を入力してください。")
      return
    }

    setIsAiLoading(true)

    try {
      // 実際の実装ではFastAPIバックエンドにリクエストを送信
      // ここではモックデータを使用
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 質問に応じたモック回答
      const mockResponse = `
        物語の中で「勇者の証」と呼ばれる青い三角形の紋章は、アルテミア大陸の伝説に登場する特別な印です。
        
        伝説によると、世界が危機に瀕したとき、異世界から勇者が召喚され、その証として選ばれた者の右手に紋章が現れるとされています。
        
        この紋章は単なる印ではなく、持ち主に特別な力を与えると言われています。物語が進むにつれて、主人公の佐藤健太がこの力を発見し、使いこなしていく展開が期待できます。
      `

      setAiResponse(mockResponse)
    } catch (error) {
      alert("AIサービスに接続できませんでした。後でもう一度お試しください。")
    } finally {
      setIsAiLoading(false)
    }
  }

  // 特定の文に対するコメントを取得
  const getSentenceComments = (index: number) => {
    return novelData.sentenceComments.filter((comment) => comment.sentenceIndex === index)
  }

  // テーマに応じたスタイルを取得
  const getThemeStyles = () => {
    switch (theme) {
      case "dark":
        return {
          backgroundColor: "#1a1a1a",
          color: "#f0f0f0",
        }
      case "sepia":
        return {
          backgroundColor: "#f5efe0",
          color: "#5f4b32",
        }
      default:
        return {
          backgroundColor: "#ffffff",
          color: "#333333",
        }
    }
  }

  // 縦書きモードの切り替え
  const toggleVerticalMode = () => {
    setIsVerticalMode(!isVerticalMode)
    setCurrentPage(0) // ページをリセット
  }

  return (
    <div
      style={{
        ...getThemeStyles(),
        transition: "background-color 0.3s, color 0.3s",
        padding: isFullscreen ? "0" : "2rem 1rem",
        margin: isFullscreen ? "0" : "0 auto",
        maxWidth: isFullscreen ? "none" : "1200px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isFullscreen ? "1fr" : "3fr 1fr",
          gap: "2rem",
        }}
      >
        <div>
          {!isFullscreen && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{novelData.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <a
                  href={`/author/${novelData.authorId}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Avatar
                    src="/placeholder.svg?height=24&width=24"
                    alt={novelData.author}
                    fallback={novelData.author[0]}
                    size="small"
                  />
                  <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{novelData.author}</span>
                </a>
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {novelData.genre} • 更新: {novelData.updatedAt}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Button
                  variant={liked ? "default" : "outline"}
                  size="small"
                  onClick={() => setLiked(!liked)}
                  style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
                >
                  <HeartIcon />
                  <span>{liked ? novelData.likes + 1 : novelData.likes}</span>
                </Button>
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="small"
                  onClick={() => setBookmarked(!bookmarked)}
                  style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
                >
                  <BookmarkIcon />
                  <span>{bookmarked ? novelData.bookmarks + 1 : novelData.bookmarks}</span>
                </Button>
                <Tooltip content="URLをコピーして共有">
                  <Button
                    variant="outline"
                    size="small"
                    style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
                  >
                    <ShareIcon />
                    <span>共有</span>
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}

          <div
            style={{
              backgroundColor: getThemeStyles().backgroundColor,
              borderRadius: isFullscreen ? "0" : "0.5rem",
              border: isFullscreen
                ? "none"
                : `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
              boxShadow: isFullscreen ? "none" : "0 1px 3px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                {isFullscreen && <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{novelData.title}</h1>}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto" }}>
                  <Tooltip content="テーマ切り替え">
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "sepia" : "light")}
                    >
                      {theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                  </Tooltip>

                  <Tooltip content={isVerticalMode ? "横書きモード" : "縦書きモード"}>
                    <Button variant="outline" size="small" onClick={toggleVerticalMode}>
                      <div style={{ transform: isVerticalMode ? "rotate(90deg)" : "none" }}>
                        <TypeIcon />
                      </div>
                    </Button>
                  </Tooltip>

                  <Tooltip content={showComments ? "コメントを非表示" : "コメントを表示"}>
                    <Button variant="outline" size="small" onClick={() => setShowComments(!showComments)}>
                      {showComments ? <EyeOffIcon /> : <EyeIcon />}
                    </Button>
                  </Tooltip>

                  <Tooltip content={isFullscreen ? "通常表示" : "全画面表示"}>
                    <Button variant="outline" size="small" onClick={toggleFullscreen}>
                      {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
                    </Button>
                  </Tooltip>
                </div>
              </div>

              <div
                ref={contentContainerRef}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: isVerticalMode ? (isFullscreen ? "90vh" : "70vh") : "auto",
                }}
              >
                <div
                  ref={contentRef}
                  style={{
                    fontSize: isFullscreen ? "1.125rem" : "1rem",
                    lineHeight: "1.75",
                    maxWidth: "none",
                    writingMode: isVerticalMode ? "vertical-rl" : "horizontal-tb",
                    textOrientation: isVerticalMode ? "upright" : "mixed",
                    height: isVerticalMode ? "100%" : "auto",
                    paddingRight: isVerticalMode ? "1rem" : "0",
                    paddingLeft: isVerticalMode ? "1rem" : "0",
                    overflowY: isVerticalMode ? "hidden" : "auto",
                    overflowX: isVerticalMode ? "auto" : "hidden",
                    direction: isVerticalMode ? "rtl" : "ltr",
                    scrollBehavior: "smooth",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    color: getThemeStyles().color,
                  }}
                  onMouseUp={handleTextSelect}
                >
                  {sentences.map((sentence, index) => {
                    const comments = getSentenceComments(index)
                    const hasComments = comments.length > 0

                    return (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          marginBottom: isVerticalMode ? "0" : "1rem",
                          marginLeft: isVerticalMode ? "1rem" : "0",
                        }}
                      >
                        <p
                          style={{
                            display: "inline",
                            lineHeight: "1.75",
                            backgroundColor:
                              hasComments && showComments
                                ? theme === "dark"
                                  ? "rgba(253, 224, 71, 0.2)"
                                  : "rgba(254, 240, 138, 0.5)"
                                : selectedSentenceIndex === index
                                  ? theme === "dark"
                                    ? "rgba(59, 130, 246, 0.2)"
                                    : "rgba(219, 234, 254, 0.5)"
                                  : "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() => handleSentenceClick(index)}
                        >
                          {sentence}
                        </p>

                        {hasComments && showComments && (
                          <div
                            style={{
                              display: "inline-block",
                              marginLeft: isVerticalMode ? "0" : "0.5rem",
                              marginTop: isVerticalMode ? "0.5rem" : "0",
                            }}
                          >
                            <Tooltip
                              content={
                                <div style={{ padding: "0.5rem" }}>
                                  {comments.map((comment) => (
                                    <div key={comment.id} style={{ marginBottom: "0.5rem" }}>
                                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <Avatar
                                          src={comment.user.avatar}
                                          alt={comment.user.name}
                                          fallback={comment.user.name[0]}
                                          size="small"
                                        />
                                        <span style={{ fontWeight: 500 }}>{comment.user.name}</span>
                                      </div>
                                      <p style={{ marginTop: "0.25rem", fontSize: "0.875rem" }}>{comment.text}</p>
                                    </div>
                                  ))}
                                </div>
                              }
                              side={isVerticalMode ? "bottom" : "right"}
                            >
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: "0",
                                  width: "1.25rem",
                                  height: "1.25rem",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                  color: "#3b82f6",
                                }}
                              >
                                <MessageSquareIcon />
                                <span
                                  style={{
                                    position: "absolute",
                                    width: "1px",
                                    height: "1px",
                                    padding: "0",
                                    margin: "-1px",
                                    overflow: "hidden",
                                    clip: "rect(0, 0, 0, 0)",
                                    whiteSpace: "nowrap",
                                    borderWidth: "0",
                                  }}
                                >
                                  コメントを表示
                                </span>
                              </button>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* 縦書きモードのページナビゲーション */}
                {isVerticalMode && totalPages > 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Button
                      variant="outline"
                      size="small"
                      onClick={nextPage}
                      disabled={currentPage >= totalPages - 1}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      <ChevronLeftIcon />
                      前へ
                    </Button>
                    <span style={{ fontSize: "0.875rem" }}>
                      {currentPage + 1} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="small"
                      onClick={prevPage}
                      disabled={currentPage <= 0}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      次へ
                      <ChevronRightIcon />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {!isFullscreen && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem 1.5rem",
                  borderTop: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.875rem",
                    color: "#6b7280",
                  }}
                >
                  <BookOpenIcon />
                  <span style={{ marginLeft: "0.25rem" }}>{novelData.views.toLocaleString()} 閲覧</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {selectedSentenceIndex !== null && (
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => setIsSentenceCommentDialogOpen(true)}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      <MessageSquareIcon />
                      選択した文にコメント
                    </Button>
                  )}

                  {selectedText && (
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => setIsTextCommentDialogOpen(true)}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      <MessageSquareIcon />
                      選択部分にコメント
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => setIsAiQuestionDialogOpen(true)}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    <HelpCircleIcon />
                    AIに質問
                  </Button>
                </div>
              </div>
            )}
          </div>

          {!isFullscreen && (
            <div style={{ marginTop: "2rem" }}>
              <Tabs defaultValue="comments">
                <TabsList>
                  <TabTrigger value="comments">コメント ({novelData.comments.length})</TabTrigger>
                  <TabTrigger value="sentenceComments">文コメント ({novelData.sentenceComments.length})</TabTrigger>
                  <TabTrigger value="chapters">章一覧 ({novelData.chapters.length})</TabTrigger>
                </TabsList>

                <TabsContent value="comments">
                  <div
                    style={{
                      backgroundColor: getThemeStyles().backgroundColor,
                      borderRadius: "0.5rem",
                      border: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "1.25rem 1.5rem",
                        borderBottom: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                      }}
                    >
                      <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>コメントを投稿</h2>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <Avatar src="/placeholder.svg?height=40&width=40" alt="ユーザー" fallback="ユ" />
                        <div style={{ flex: 1 }}>
                          <Textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="この作品についてのコメントを書いてください..."
                            style={{ marginBottom: "0.5rem" }}
                          />
                          <Button
                            onClick={postComment}
                            style={{
                              marginLeft: "auto",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <SendIcon />
                            投稿
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {novelData.comments.map((comment) => (
                          <div
                            key={comment.id}
                            style={{
                              display: "flex",
                              gap: "1rem",
                              paddingBottom: "1rem",
                              borderBottom: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                            }}
                          >
                            <Avatar src={comment.user.avatar} alt={comment.user.name} fallback={comment.user.name[0]} />
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "0.25rem",
                                }}
                              >
                                <span style={{ fontWeight: 500 }}>{comment.user.name}</span>
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#6b7280",
                                  }}
                                >
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>{comment.text}</p>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.25rem",
                                  fontSize: "0.75rem",
                                  color: "#6b7280",
                                  cursor: "pointer",
                                }}
                              >
                                <ThumbsUpIcon />
                                <span>{comment.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sentenceComments">
                  <div
                    style={{
                      backgroundColor: getThemeStyles().backgroundColor,
                      borderRadius: "0.5rem",
                      border: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "1.25rem 1.5rem",
                        borderBottom: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                      }}
                    >
                      <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>文単位のコメント</h2>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>特定の文に対するコメントを表示します</p>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {novelData.sentenceComments.map((comment) => (
                          <div
                            key={comment.id}
                            style={{
                              display: "flex",
                              gap: "1rem",
                              paddingBottom: "1rem",
                              borderBottom: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                            }}
                          >
                            <Avatar src={comment.user.avatar} alt={comment.user.name} fallback={comment.user.name[0]} />
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "0.25rem",
                                }}
                              >
                                <span style={{ fontWeight: 500 }}>{comment.user.name}</span>
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#6b7280",
                                  }}
                                >
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div
                                style={{
                                  backgroundColor:
                                    theme === "dark" ? "#2d2d2d" : theme === "sepia" ? "#ebe3d5" : "#f3f4f6",
                                  padding: "0.5rem",
                                  borderRadius: "0.375rem",
                                  marginBottom: "0.5rem",
                                  fontSize: "0.875rem",
                                }}
                              >
                                <q>{sentences[comment.sentenceIndex]}</q>
                              </div>
                              <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>{comment.text}</p>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.25rem",
                                  fontSize: "0.75rem",
                                  color: "#6b7280",
                                  cursor: "pointer",
                                }}
                              >
                                <ThumbsUpIcon />
                                <span>{comment.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="chapters">
                  <div
                    style={{
                      backgroundColor: getThemeStyles().backgroundColor,
                      borderRadius: "0.5rem",
                      border: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "1.25rem 1.5rem",
                        borderBottom: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                      }}
                    >
                      <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>章一覧</h2>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {novelData.chapters.map((chapter) => (
                          <div
                            key={chapter.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "0.75rem",
                              border: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                              borderRadius: "0.375rem",
                              transition: "background-color 0.2s",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor =
                                theme === "dark" ? "#2d2d2d" : theme === "sepia" ? "#ebe3d5" : "#f3f4f6"
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent"
                            }}
                          >
                            <span style={{ fontWeight: 500 }}>{chapter.title}</span>
                            {chapter.published ? (
                              <a
                                href={`/novel/${novelData.id}/chapter/${chapter.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#0070f3",
                                  fontSize: "0.875rem",
                                  fontWeight: 500,
                                }}
                              >
                                読む
                              </a>
                            ) : (
                              <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>準備中</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        {!isFullscreen && (
          <div>
            <div
              style={{
                backgroundColor: getThemeStyles().backgroundColor,
                borderRadius: "0.5rem",
                border: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                overflow: "hidden",
                position: "sticky",
                top: "1.25rem",
              }}
            >
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                }}
              >
                <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>作者について</h2>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Avatar
                    src="/placeholder.svg?height=64&width=64"
                    alt={novelData.author}
                    fallback={novelData.author[0]}
                    size="large"
                  />
                  <h3 style={{ fontWeight: 500, marginTop: "0.5rem" }}>{novelData.author}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>ファンタジー作家</p>
                </div>
                <Button style={{ width: "100%", marginBottom: "0.5rem" }}>フォローする</Button>
                <a
                  href={`/author/${novelData.authorId}`}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    textAlign: "center",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  作品一覧を見る
                </a>
              </div>
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderTop: `1px solid ${theme === "dark" ? "#444" : theme === "sepia" ? "#d3c6a6" : "#e2e8f0"}`,
                }}
              >
                <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>おすすめ作品</h2>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[1, 2, 3].map((id) => (
                    <a
                      key={id}
                      href={`/novel/${id}`}
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <div
                        style={{
                          width: "3rem",
                          height: "4rem",
                          backgroundColor: theme === "dark" ? "#2d2d2d" : theme === "sepia" ? "#ebe3d5" : "#f3f4f6",
                          borderRadius: "0.25rem",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {id === 1 ? "魔法学園の天才少女" : id === 2 ? "剣と魔法の冒険譚" : "未来都市の探偵"}
                        </h4>
                        <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {id === 1 ? "佐藤花子" : id === 2 ? "山田太郎" : "鈴木一郎"}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ダイアログ */}
      {isSentenceCommentDialogOpen && selectedSentenceIndex !== null && (
        <Dialog
          isOpen={isSentenceCommentDialogOpen}
          onClose={() => setIsSentenceCommentDialogOpen(false)}
          title="選択した文にコメント"
          description={`選択した文: ${sentences[selectedSentenceIndex]}`}
          footer={<Button onClick={postSentenceComment}>投稿する</Button>}
        >
          <Textarea
            value={sentenceCommentText}
            onChange={(e) => setSentenceCommentText(e.target.value)}
            placeholder="この部分についてのコメントを書いてください..."
            style={{ minHeight: "100px" }}
          />
        </Dialog>
      )}

      {isTextCommentDialogOpen && selectedText && (
        <Dialog
          isOpen={isTextCommentDialogOpen}
          onClose={() => setIsTextCommentDialogOpen(false)}
          title="選択部分にコメント"
          description={`選択したテキスト: ${selectedText}`}
          footer={<Button onClick={postComment}>投稿する</Button>}
        >
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="この部分についてのコメントを書いてください..."
            style={{ minHeight: "100px" }}
          />
        </Dialog>
      )}

      {isAiQuestionDialogOpen && (
        <Dialog
          isOpen={isAiQuestionDialogOpen}
          onClose={() => setIsAiQuestionDialogOpen(false)}
          title="物語についてAIに質問"
          description="物語の設定や登場人物について質問できます"
          footer={
            <Button onClick={askAI} disabled={isAiLoading}>
              {isAiLoading ? "処理中..." : "質問する"}
            </Button>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="例: 「勇者の証」とは何ですか？"
              style={{ minHeight: "80px" }}
            />
            {aiResponse && (
              <div
                style={{
                  backgroundColor: theme === "dark" ? "#2d2d2d" : theme === "sepia" ? "#ebe3d5" : "#f3f4f6",
                  padding: "1rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  whiteSpace: "pre-line",
                }}
              >
                {aiResponse}
              </div>
            )}
          </div>
        </Dialog>
      )}
    </div>
  )
}
