"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// モックデータ
const mockNovel = {
  id: 1,
  title: "異世界転生物語",
  author: "山田太郎",
  genre: "ファンタジー",
  coverImage: "/placeholder.svg?height=300&width=200",
  description: "平凡なサラリーマンが異世界に転生し、勇者として冒険を始める物語。",
  content: `第一章 転生

朝目覚めると、見知らぬ天井が目に入った。

「ここはどこだ？」

記憶を辿ると、昨日まで会社で働いていたはずなのに、なぜかこの場所にいる。

周りを見回すと、中世ヨーロッパ風の部屋だった。石造りの壁、木製の家具、そして窓からは見たことのない街並みが見える。

「まさか、異世界に転生したのか？」

そう思った瞬間、頭の中で機械的な音が鳴った。

【システム起動中...】
【プレイヤー名: 田中一郎】
【職業: 勇者】
【レベル: 1】
【スキル: 剣術Lv1, 魔法Lv1】

「やっぱり転生していたのか...」

戸惑いながらも、この状況を受け入れることにした。元の世界では平凡なサラリーマンだったが、ここでは勇者として生きていくことになる。

窓から外を見ると、街の人々が忙しそうに動き回っている。この世界で何が起こっているのか、まずは情報を集める必要がある。

「よし、街に出てみよう」

そう決意した田中は、部屋の隅に置かれていた剣を手に取り、ドアを開けた。

新しい冒険の始まりだった。`,
  likes: 843,
  bookmarks: 256,
  views: 12500,
  chapters: [
    { id: 1, title: "第一章 転生", wordCount: 2500 },
    { id: 2, title: "第二章 街の探索", wordCount: 3200 },
    { id: 3, title: "第三章 最初の戦い", wordCount: 2800 },
  ],
  tags: ["異世界", "転生", "ファンタジー", "冒険"],
  updatedAt: "2023-11-20",
  status: "連載中",
}

const mockComments = [
  {
    id: 1,
    user: {
      id: 1,
      name: "読者A",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "面白いですね！続きが楽しみです。",
    createdAt: "2023-11-20T10:30:00Z",
    likes: 5,
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "読者B",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "異世界転生ものは大好きです。主人公の成長が楽しみ！",
    createdAt: "2023-11-20T11:15:00Z",
    likes: 3,
  },
]

export default function NovelPage() {
  const [novel] = useState(mockNovel)
  const [comments, setComments] = useState(mockComments)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [fontSize, setFontSize] = useState(16)
  const [lineHeight, setLineHeight] = useState(1.6)
  const [theme, setTheme] = useState<"light" | "dark" | "sepia">("light")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(1)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: novel.title,
        text: novel.description,
        url: window.location.href,
      })
    } else {
      // フォールバック: URLをクリップボードにコピー
      navigator.clipboard.writeText(window.location.href)
      alert("URLをクリップボードにコピーしました")
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: {
          id: 999,
          name: "あなた",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
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
      {/* ヘッダー */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/explore"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.875rem",
            marginBottom: "1rem",
          }}
        >
          ← 作品一覧に戻る
        </Link>

        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          {/* カバー画像 */}
          <div style={{ flexShrink: 0 }}>
            <Image
              src={novel.coverImage}
              alt={novel.title}
              width={200}
              height={300}
              style={{ borderRadius: "0.5rem" }}
            />
          </div>

          {/* 作品情報 */}
          <div style={{ flex: "1", minWidth: 0 }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              {novel.title}
            </h1>
            <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              著者: {novel.author}
            </p>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
              {novel.description}
            </p>

            {/* タグ */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              {novel.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    borderRadius: "1rem",
                    fontSize: "0.75rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 統計情報 */}
            <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
              <span>📖 {novel.chapters.length}章</span>
              <span>👁️ {formatNumber(novel.views)}</span>
              <span>❤️ {formatNumber(novel.likes)}</span>
              <span>🔖 {formatNumber(novel.bookmarks)}</span>
              <span>📅 {formatDate(novel.updatedAt)}</span>
            </div>

            {/* アクションボタン */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleLike}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-color)",
                  backgroundColor: isLiked ? "var(--primary-color)" : "transparent",
                  color: isLiked ? "white" : "var(--text-color)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ❤️ {isLiked ? "いいね済み" : "いいね"}
              </button>
              <button
                onClick={handleBookmark}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-color)",
                  backgroundColor: isBookmarked ? "var(--primary-color)" : "transparent",
                  color: isBookmarked ? "white" : "var(--text-color)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                🔖 {isBookmarked ? "ブックマーク済み" : "ブックマーク"}
              </button>
              <button
                onClick={handleShare}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "transparent",
                  color: "var(--text-color)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                📤 シェア
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 読書設定 */}
      <div
        style={{
          backgroundColor: "var(--bg-color)",
          borderRadius: "0.5rem",
          border: "1px solid var(--border-color)",
          padding: "1rem",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem" }}>読書設定</h3>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* テーマ選択 */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.875rem" }}>テーマ:</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as "light" | "dark" | "sepia")}
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
              }}
            >
              <option value="light">ライト</option>
              <option value="dark">ダーク</option>
              <option value="sepia">セピア</option>
            </select>
          </div>

          {/* フォントサイズ */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.875rem" }}>フォントサイズ:</span>
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: "100px" }}
            />
            <span style={{ fontSize: "0.875rem", minWidth: "2rem" }}>{fontSize}px</span>
          </div>

          {/* 行間 */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.875rem" }}>行間:</span>
            <input
              type="range"
              min="1.2"
              max="2.0"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              style={{ width: "100px" }}
            />
            <span style={{ fontSize: "0.875rem", minWidth: "2rem" }}>{lineHeight.toFixed(1)}</span>
          </div>

          {/* 全画面表示 */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid var(--border-color)",
              backgroundColor: "transparent",
              color: "var(--text-color)",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            {isFullscreen ? "📱 通常表示" : "🖥️ 全画面表示"}
          </button>
        </div>
      </div>

      {/* 章選択 */}
      <div
        style={{
          backgroundColor: "var(--bg-color)",
          borderRadius: "0.5rem",
          border: "1px solid var(--border-color)",
          padding: "1rem",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1rem" }}>章選択</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {novel.chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setCurrentChapter(chapter.id)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--border-color)",
                backgroundColor: currentChapter === chapter.id ? "var(--primary-color)" : "transparent",
                color: currentChapter === chapter.id ? "white" : "var(--text-color)",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              {chapter.title} ({chapter.wordCount}文字)
            </button>
          ))}
        </div>
      </div>

      {/* 本文 */}
      <div
        style={{
          backgroundColor: "var(--bg-color)",
          borderRadius: "0.5rem",
          border: "1px solid var(--border-color)",
          padding: "2rem",
          marginBottom: "2rem",
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          color: "var(--text-color)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "2rem" }}>
          {novel.chapters.find((c) => c.id === currentChapter)?.title}
        </h2>
        <div style={{ whiteSpace: "pre-line" }}>{novel.content}</div>
      </div>

      {/* ナビゲーション */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <button
          onClick={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
          disabled={currentChapter === 1}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            border: "1px solid var(--border-color)",
            backgroundColor: "transparent",
            color: currentChapter === 1 ? "var(--text-muted)" : "var(--text-color)",
            cursor: currentChapter === 1 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          ← 前の章
        </button>
        <button
          onClick={() => setCurrentChapter(Math.min(novel.chapters.length, currentChapter + 1))}
          disabled={currentChapter === novel.chapters.length}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            border: "1px solid var(--border-color)",
            backgroundColor: "transparent",
            color: currentChapter === novel.chapters.length ? "var(--text-muted)" : "var(--text-color)",
            cursor: currentChapter === novel.chapters.length ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          次の章 →
        </button>
      </div>

      {/* コメントセクション */}
      <div
        style={{
          backgroundColor: "var(--bg-color)",
          borderRadius: "0.5rem",
          border: "1px solid var(--border-color)",
          padding: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>コメント</h3>
          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid var(--border-color)",
              backgroundColor: "transparent",
              color: "var(--text-color)",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            💬 {showComments ? "非表示" : "表示"}
          </button>
        </div>

        {showComments && (
          <div>
            {/* コメント投稿フォーム */}
            <form onSubmit={handleCommentSubmit} style={{ marginBottom: "2rem" }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを入力してください..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "1rem",
                  borderRadius: "0.375rem",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-color)",
                  color: "var(--text-color)",
                  resize: "vertical",
                  marginBottom: "1rem",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                コメントを投稿
              </button>
            </form>

            {/* コメント一覧 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    padding: "1rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "0.375rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <Image
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      width={32}
                      height={32}
                      style={{ borderRadius: "50%" }}
                    />
                    <span style={{ fontWeight: "bold", fontSize: "0.875rem" }}>{comment.user.name}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", lineHeight: "1.5", margin: 0 }}>{comment.content}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
                    <button
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "transparent",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      👍 {comment.likes}
                    </button>
                    <button
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.25rem",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "transparent",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                      }}
                    >
                      返信
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
