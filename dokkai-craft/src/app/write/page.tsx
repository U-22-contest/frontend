"use client"

import { useState } from "react"

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [genre, setGenre] = useState("fantasy")
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  // テキストエリアでのテキスト選択を処理
  const handleTextSelect = () => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      setSelectedText(selection.toString())
    }
  }

  // AIによる文章補完
  const handleAIComplete = async () => {
    setIsGenerating(true)

    try {
      // 実際の実装ではFastAPIバックエンドにリクエストを送信
      // ここではモックデータを使用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockSuggestions = [
        content +
        "彼は窓の外を見つめ、遠くに広がる山々の稜線を眺めた。雲が低く垂れ込め、雨の匂いが空気中に漂っていた。",
        content +
        "彼女は深呼吸をして、目の前の課題に集中した。これまでの努力が実を結ぶ瞬間が近づいていることを感じていた。",
        content + "街の喧騒が遠のき、静寂が訪れた。時折聞こえる風の音だけが、この場所が現実であることを思い出させた。",
      ]

      setAiSuggestions(mockSuggestions)
    } catch (error) {
      alert("エラーが発生しました: AIサービスに接続できませんでした。後でもう一度お試しください。")
    } finally {
      setIsGenerating(false)
    }
  }

  // 描写の提案を取得
  const getDescriptionSuggestions = async () => {
    if (!selectedText) {
      alert("テキストが選択されていません: 描写の提案を受けるには、テキストを選択してください。")
      return
    }

    setIsGenerating(true)

    try {
      // 実際の実装ではFastAPIバックエンドにリクエストを送信
      // ここではモックデータを使用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockSuggestions = [
        "陽の光が差し込む窓辺で、埃の粒子が舞い踊っていた。時間が止まったかのような静けさの中で、彼の思考だけが激しく動いていた。",
        "雨の音が屋根を叩き、部屋の中に心地よいリズムを作り出していた。窓ガラスを伝う雨粒は、外の世界をぼやけた絵画のように変えていた。",
        "古い木の床は足音に反応して軋み、この家の長い歴史を物語っていた。壁に掛けられた時計の秒針だけが、この静寂を破る唯一の音だった。",
      ]

      setAiSuggestions(mockSuggestions)
    } catch (error) {
      alert("エラーが発生しました: AIサービスに接続できませんでした。後でもう一度お試しください。")
    } finally {
      setIsGenerating(false)
    }
  }

  // 提案を適用
  const applySuggestion = (suggestion: string) => {
    if (selectedText) {
      // 選択されたテキストを置き換え
      setContent(content.replace(selectedText, suggestion))
    } else {
      // 文章の続きとして追加
      setContent(suggestion)
    }
    setAiSuggestions([])
  }

  // 作品を保存
  const saveNovel = () => {
    if (!title) {
      alert("タイトルが入力されていません: 作品を保存するには、タイトルを入力してください。")
      return
    }

    // 実際の実装ではバックエンドにデータを送信
    alert("作品が保存されました: 下書きとして保存しました。")
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          "@media (min-width: 1024px)": {
            flexDirection: "row",
          },
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <input
              type="text"
              placeholder="タイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: "0.375rem",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ position: "relative" }}>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  style={{
                    width: "180px",
                    padding: "0.5rem 2rem 0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-color)",
                    color: "var(--text-color)",
                    appearance: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  <option value="fantasy">ファンタジー</option>
                  <option value="sf">SF</option>
                  <option value="romance">恋愛</option>
                  <option value="mystery">ミステリー</option>
                  <option value="daily">日常</option>
                </select>
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
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              <div style={{ position: "relative" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "0.375rem",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setIsTooltipVisible(true)}
                  onMouseLeave={() => setIsTooltipVisible(false)}
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
                </button>
                {isTooltipVisible && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: "var(--bg-color)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      zIndex: 10,
                      width: "200px",
                      textAlign: "center",
                      fontSize: "0.875rem",
                    }}
                  >
                    <p>ジャンルを選択すると、AIがそのジャンルに適した提案をします</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={saveNovel}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  border: "1px solid var(--border-color)",
                  backgroundColor: "transparent",
                  color: "var(--text-color)",
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
                  style={{ marginRight: "0.5rem" }}
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                保存
              </button>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  border: "1px solid var(--border-color)",
                  backgroundColor: "transparent",
                  color: "var(--text-color)",
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
                  style={{ marginRight: "0.5rem" }}
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                プレビュー
              </button>
            </div>
          </div>

          <textarea
            placeholder="ここに物語を書き始めましょう..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onMouseUp={handleTextSelect}
            style={{
              width: "100%",
              minHeight: "60vh",
              padding: "1rem",
              fontSize: "1rem",
              lineHeight: 1.5,
              resize: "none",
              borderRadius: "0.375rem",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          />

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={handleAIComplete}
              disabled={isGenerating || !content}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "var(--primary-color)",
                color: "var(--primary-foreground)",
                border: "none",
                cursor: isGenerating || !content ? "not-allowed" : "pointer",
                opacity: isGenerating || !content ? 0.5 : 1,
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
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
              AIで続きを書く
            </button>
            <button
              onClick={getDescriptionSuggestions}
              disabled={isGenerating || !selectedText}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: "1px solid var(--border-color)",
                backgroundColor: "transparent",
                color: "var(--text-color)",
                cursor: isGenerating || !selectedText ? "not-allowed" : "pointer",
                opacity: isGenerating || !selectedText ? 0.5 : 1,
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
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4" />
                <path d="M19 17v4" />
                <path d="M3 5h4" />
                <path d="M17 19h4" />
              </svg>
              選択部分の描写を改善
            </button>
          </div>
        </div>

        {aiSuggestions.length > 0 && (
          <div
            style={{
              width: "100%",
              "@media (min-width: 1024px)": {
                width: "33.333333%",
              },
            }}
          >
            <div
              style={{
                backgroundColor: "var(--bg-color)",
                borderRadius: "0.5rem",
                border: "1px solid var(--border-color)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>AIの提案</h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                  {selectedText ? "選択したテキストの描写の改善案です" : "物語の続きの提案です"}
                </p>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "0.75rem",
                        border: "1px solid var(--border-color)",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onClick={() => applySuggestion(suggestion)}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--bg-muted)"
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                    >
                      <p style={{ fontSize: "0.875rem" }}>{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  padding: "1rem 1.5rem",
                  borderTop: "1px solid var(--border-color)",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setAiSuggestions([])}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    backgroundColor: "transparent",
                    color: "var(--text-color)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
