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
        backgroundColor: "var(--bg-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.currentTarget as HTMLImageElement
          target.style.display = "none"
          const nextSibling = target.nextElementSibling as HTMLDivElement
          if (nextSibling) {
            nextSibling.style.display = "flex"
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
          color: "var(--text-muted)",
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
      backgroundColor: "var(--primary-color)",
      color: "var(--primary-foreground)",
      border: "1px solid transparent",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--text-color)",
      border: "1px solid var(--border-color)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--text-color)",
      border: "1px solid transparent",
    },
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
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.875rem",
            maxWidth: "20rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid var(--border-color)",
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
          backgroundColor: "var(--bg-color)",
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
            {description && <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{description}</p>}
          </div>
        )}
        <div>{children}</div>
        {footer && <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>{footer}</div>}
      </div>
    </div>
  )
}

// タブコンポーネントの型定義
type TabTriggerProps = {
  children: React.ReactNode
  value: string
  isActive?: boolean
  onClick?: () => void
}

type TabsContentProps = {
  children: React.ReactNode
  value: string
  isActive?: boolean
}

type TabsListProps = {
  children: React.ReactElement<TabTriggerProps>[]
}

type TabsProps = {
  children: React.ReactElement<TabsListProps | TabsContentProps>[]
  defaultValue: string
}

// タブコンポーネント
const Tabs = ({
  children,
  defaultValue,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  // タブの子要素を処理
  const tabTriggers: React.ReactElement[] = []
  const tabContents: React.ReactElement[] = []

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<TabsListProps | TabsContentProps>(child)) {
      if (child.type === TabsList) {
        const listChild = child as React.ReactElement<TabsListProps>
        // TabsListの子要素（TabTrigger）を処理
        const triggers = React.Children.map(listChild.props.children, (trigger) => {
          if (React.isValidElement<TabTriggerProps>(trigger) && trigger.type === TabTrigger) {
            return React.cloneElement<TabTriggerProps>(trigger, {
              isActive: trigger.props.value === activeTab,
              onClick: () => setActiveTab(trigger.props.value),
            })
          }
          return trigger
        })
        if (triggers) {
          tabTriggers.push(React.cloneElement(listChild, {}, triggers))
        }
      } else if (child.type === TabsContent) {
        const contentChild = child as React.ReactElement<TabsContentProps>
        // TabsContentを処理
        tabContents.push(
          React.cloneElement<TabsContentProps>(contentChild, {
            isActive: contentChild.props.value === activeTab,
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

const TabsList = ({ children }: TabsListProps) => {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid var(--border-color)",
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
}: TabTriggerProps) => {
  return (
    <button
      style={{
        padding: "0.5rem 1rem",
        fontWeight: 500,
        borderBottom: isActive ? "2px solid var(--primary-color)" : "2px solid transparent",
        color: isActive ? "var(--primary-color)" : "inherit",
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
}: TabsContentProps) => {
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
        border: "1px solid var(--border-color)",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
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
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }
      case "sepia":
        return {
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }
      default:
        return {
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
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
      {/* 小説閲覧ページの残りの部分は省略 */}
      {/* 実際の実装では、上記のコンポーネントを使用して小説閲覧ページを構築します */}
    </div>
  )
}
