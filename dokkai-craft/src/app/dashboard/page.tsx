"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// モックデータ - 将来的に実際のAPIからのデータに置き換え可能
const overviewData = {
  totalViews: 45280,
  totalLikes: 3621,
  totalComments: 892,
  followers: 412,
  novels: 8,
  aiUsage: 76, // AI提案の活用率（%）
}

// データ型の定義
type ViewsDataItem = {
  name: string
  views: number
}

type EngagementDataItem = {
  name: string
  likes: number
  comments: number
}

type AiUsageDataItem = {
  name: string
  value: number
  color: string
}

// 閲覧数のモックデータ - 将来的に実際のAPIからのデータに置き換え可能
const viewsData: ViewsDataItem[] = [
  { name: "1月", views: 3200 },
  { name: "2月", views: 3800 },
  { name: "3月", views: 4100 },
  { name: "4月", views: 3900 },
  { name: "5月", views: 4800 },
  { name: "6月", views: 5200 },
  { name: "7月", views: 5600 },
  { name: "8月", views: 6100 },
  { name: "9月", views: 6800 },
  { name: "10月", views: 7200 },
  { name: "11月", views: 7800 },
  { name: "12月", views: 8500 },
]

// エンゲージメントのモックデータ - 将来的に実際のAPIからのデータに置き換え可能
const engagementData: EngagementDataItem[] = [
  { name: "1月", likes: 240, comments: 80 },
  { name: "2月", likes: 280, comments: 95 },
  { name: "3月", likes: 310, comments: 105 },
  { name: "4月", likes: 290, comments: 90 },
  { name: "5月", likes: 350, comments: 120 },
  { name: "6月", likes: 380, comments: 130 },
  { name: "7月", likes: 410, comments: 140 },
  { name: "8月", likes: 450, comments: 150 },
  { name: "9月", likes: 490, comments: 170 },
  { name: "10月", likes: 520, comments: 180 },
  { name: "11月", likes: 560, comments: 190 },
  { name: "12月", likes: 610, comments: 210 },
]

// AI活用状況のモックデータ - 将来的に実際のAPIからのデータに置き換え可能
const aiUsageData: AiUsageDataItem[] = [
  { name: "文章補完", value: 45, color: "#0088FE" },
  { name: "描写提案", value: 30, color: "#00C49F" },
  { name: "プロット提案", value: 15, color: "#FFBB28" },
  { name: "キャラクター設定", value: 10, color: "#FF8042" },
]

// 作品別パフォーマンスのモックデータ - 将来的に実際のAPIからのデータに置き換え可能
const novelPerformanceData = [
  {
    id: 1,
    title: "異世界転生物語",
    views: 12500,
    likes: 843,
    comments: 256,
    engagement: 8.8,
  },
  {
    id: 2,
    title: "魔法学園の天才少女",
    views: 9800,
    likes: 720,
    comments: 198,
    engagement: 9.4,
  },
  {
    id: 3,
    title: "未来都市の探偵",
    views: 8200,
    likes: 610,
    comments: 175,
    engagement: 9.6,
  },
  {
    id: 4,
    title: "剣と魔法の冒険譚",
    views: 7400,
    likes: 520,
    comments: 145,
    engagement: 9.0,
  },
  {
    id: 5,
    title: "恋する魔法使い",
    views: 7300,
    likes: 580,
    comments: 118,
    engagement: 9.5,
  },
]

type SimpleLineChartProps = {
  data: ViewsDataItem[] // より具体的な型を使用
  height?: number
}

type SimpleBarChartProps = {
  data: EngagementDataItem[] // より具体的な型を使用
  keys: Array<"likes" | "comments"> // リテラル型のユニオンで制限
  height?: number
  colors?: string[]
}

type SimplePieChartProps = {
  data: AiUsageDataItem[]
  nameKey: "name" // リテラル型で制限
  height?: number
}

// シンプルな折れ線グラフコンポーネント
const SimpleLineChart = ({ data, height = 300 }: SimpleLineChartProps) => {
  // データの最大値を計算
  const maxValue = Math.max(...data.map((item) => item.views)) * 1.1 // 10%余裕を持たせる

  return (
    <div style={{ height: `${height}px`, position: "relative", padding: "20px 40px 20px 60px" }}>
      {/* Y軸の目盛り */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 20,
          width: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {[5, 4, 3, 2, 1, 0].map((i) => (
          <div key={i} style={{ fontSize: "10px", color: "var(--text-muted)" }}>
            {Math.round((maxValue * i) / 5).toLocaleString()}
          </div>
        ))}
      </div>

      {/* グラフ本体 */}
      <div style={{ height: "calc(100% - 20px)", position: "relative" }}>
        {/* 横線（グリッド） */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: `${i * 20}%`,
              borderTop: "1px dashed var(--border-color)",
              height: 1,
            }}
          />
        ))}

        {/* データポイント */}
        <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end" }}>
          {data.map((item, index) => {
            const height = (item.views / maxValue) * 100
            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  position: "relative",
                }}
              >
                {/* データバー */}
                <div
                  style={{
                    width: "8px",
                    height: `${height}%`,
                    backgroundColor: "var(--primary-color)",
                    borderRadius: "4px 4px 0 0",
                    position: "absolute",
                    bottom: 0,
                  }}
                />

                {/* X軸ラベル */}
                <div style={{ position: "absolute", bottom: -20, fontSize: "10px", color: "var(--text-muted)" }}>
                  {item.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// シンプルな棒グラフコンポーネント
const SimpleBarChart = ({ data, keys, height = 300, colors = ["var(--primary-color)", "#00C49F"] }: SimpleBarChartProps) => {
  // データの最大値を計算
  let maxValue = 0
  data.forEach((item) => {
    keys.forEach((key) => {
      maxValue = Math.max(maxValue, item[key])
    })
  })
  maxValue = maxValue * 1.1 // 10%余裕を持たせる

  return (
    <div style={{ height: `${height}px`, position: "relative", padding: "20px 40px 20px 60px" }}>
      {/* Y軸の目盛り */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 20,
          width: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {[5, 4, 3, 2, 1, 0].map((i) => (
          <div key={i} style={{ fontSize: "10px", color: "var(--text-muted)" }}>
            {Math.round((maxValue * i) / 5).toLocaleString()}
          </div>
        ))}
      </div>

      {/* グラフ本体 */}
      <div style={{ height: "calc(100% - 20px)", position: "relative" }}>
        {/* 横線（グリッド） */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: `${i * 20}%`,
              borderTop: "1px dashed var(--border-color)",
              height: 1,
            }}
          />
        ))}

        {/* データポイント */}
        <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end" }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                position: "relative",
              }}
            >
              {/* 複数のデータバー */}
              <div style={{ display: "flex", height: "100%", alignItems: "flex-end", gap: "4px" }}>
                {keys.map((key, keyIndex) => {
                  const height = (item[key] / maxValue) * 100
                  return (
                    <div
                      key={keyIndex}
                      style={{
                        width: "8px",
                        height: `${height}%`,
                        backgroundColor: colors[keyIndex],
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                  )
                })}
              </div>

              {/* X軸ラベル */}
              <div style={{ position: "absolute", bottom: -20, fontSize: "10px", color: "var(--text-muted)" }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 凡例 */}
      <div style={{ position: "absolute", top: 10, right: 10, display: "flex", flexDirection: "column", gap: "5px" }}>
        {keys.map((key, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "12px", height: "12px", backgroundColor: colors[index], borderRadius: "2px" }} />
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {key === "likes" ? "いいね" : "コメント"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// シンプルな円グラフコンポーネント
const SimplePieChart = ({ data, nameKey, height = 300 }: SimplePieChartProps) => {
  // 合計値を計算
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // 累積角度を追跡
  let cumulativeAngle = 0

  return (
    <div
      style={{
        height: `${height}px`,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 円グラフ */}
      <div style={{ width: "200px", height: "200px", position: "relative", borderRadius: "50%", overflow: "hidden" }}>
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100
          const angle = (percentage / 100) * 360
          const oldAngle = cumulativeAngle
          cumulativeAngle += angle

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: item.color,
                clipPath: `conic-gradient(from ${oldAngle}deg, ${item.color} ${angle}deg, transparent ${angle}deg)`,
              }}
            />
          )
        })}
      </div>

      {/* 凡例 */}
      <div
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {data.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "12px", height: "12px", backgroundColor: item.color, borderRadius: "2px" }} />
            <span style={{ fontSize: "12px" }}>
              {item[nameKey]} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [activeTab, setActiveTab] = useState("views")
  const [isMobile, setIsMobile] = useState(false)

  // 画面サイズの検出
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 初期チェック
    checkIfMobile()

    // リサイズイベントのリスナー
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>ダッシュボード</h1>
          <p style={{ color: "var(--text-muted)" }}>あなたの作品のパフォーマンスを確認しましょう</p>
        </div>
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              width: "180px",
              padding: "0.5rem 2rem 0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option value="week">過去7日間</option>
            <option value="month">過去30日間</option>
            <option value="year">過去12ヶ月</option>
            <option value="all">全期間</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              padding: "1.25rem",
            }}
          >
            <div style={{ paddingBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500 }}>総閲覧数</h3>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "0.5rem", color: "var(--text-muted)" }}
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{overviewData.totalViews.toLocaleString()}</div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>前月比 +12.5%</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              padding: "1.25rem",
            }}
          >
            <div style={{ paddingBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500 }}>総いいね数</h3>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "0.5rem", color: "var(--text-muted)" }}
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{overviewData.totalLikes.toLocaleString()}</div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>前月比 +8.3%</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              padding: "1.25rem",
            }}
          >
            <div style={{ paddingBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500 }}>総コメント数</h3>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "0.5rem", color: "var(--text-muted)" }}
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {overviewData.totalComments.toLocaleString()}
                </div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>前月比 +15.2%</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              padding: "1.25rem",
            }}
          >
            <div style={{ paddingBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500 }}>フォロワー</h3>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "0.5rem", color: "var(--text-muted)" }}
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{overviewData.followers.toLocaleString()}</div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>前月比 +5.7%</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              padding: "1.25rem",
            }}
          >
            <div style={{ paddingBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500 }}>エンゲージメント率</h3>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "0.5rem", color: "var(--text-muted)" }}
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>8.9%</div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>前月比 +1.2%</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              padding: "1.25rem",
            }}
          >
            <div style={{ paddingBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 500 }}>AI提案活用率</h3>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "0.5rem", color: "var(--text-muted)" }}
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{overviewData.aiUsage}%</div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>前月比 +4.5%</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--border-color)",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() => setActiveTab("views")}
            style={{
              padding: "0.5rem 1rem",
              fontWeight: 500,
              borderBottom: activeTab === "views" ? "2px solid var(--primary-color)" : "2px solid transparent",
              color: activeTab === "views" ? "var(--primary-color)" : "inherit",
              cursor: "pointer",
              background: "none",
              border: "none",
              outline: "none",
            }}
          >
            閲覧数
          </button>
          <button
            onClick={() => setActiveTab("engagement")}
            style={{
              padding: "0.5rem 1rem",
              fontWeight: 500,
              borderBottom: activeTab === "engagement" ? "2px solid var(--primary-color)" : "2px solid transparent",
              color: activeTab === "engagement" ? "var(--primary-color)" : "inherit",
              cursor: "pointer",
              background: "none",
              border: "none",
              outline: "none",
            }}
          >
            エンゲージメント
          </button>
          <button
            onClick={() => setActiveTab("ai-usage")}
            style={{
              padding: "0.5rem 1rem",
              fontWeight: 500,
              borderBottom: activeTab === "ai-usage" ? "2px solid var(--primary-color)" : "2px solid transparent",
              color: activeTab === "ai-usage" ? "var(--primary-color)" : "inherit",
              cursor: "pointer",
              background: "none",
              border: "none",
              outline: "none",
            }}
          >
            AI活用状況
          </button>
        </div>

        {activeTab === "views" && (
          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>閲覧数の推移</h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>月別の総閲覧数の推移を表示します</p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <SimpleLineChart data={viewsData} height={300} />
            </div>
          </div>
        )}

        {activeTab === "engagement" && (
          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>エンゲージメントの推移</h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                月別のいいね数とコメント数の推移を表示します
              </p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <SimpleBarChart
                data={engagementData}
                keys={["likes", "comments"]}
                colors={["var(--primary-color)", "#00C49F"]}
                height={300}
              />
            </div>
          </div>
        )}

        {activeTab === "ai-usage" && (
          <div
            style={{
              backgroundColor: "var(--bg-color)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>AI提案の活用状況</h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>AI機能の種類別活用状況を表示します</p>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SimplePieChart data={aiUsageData} nameKey="name" height={300} />

                <div style={{ width: "100%", marginTop: "1rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 500, marginBottom: "0.5rem" }}>
                    AI機能の活用ポイント
                  </h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <li style={{ display: "flex", alignItems: "flex-start" }}>
                      <div
                        style={{
                          marginRight: "0.5rem",
                          marginTop: "0.125rem",
                          backgroundColor: "rgba(0, 136, 254, 0.1)",
                          padding: "0.25rem",
                          borderRadius: "9999px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0088FE"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                          <path d="M9 18h6" />
                          <path d="M10 22h4" />
                        </svg>
                      </div>
                      <span style={{ fontSize: "0.875rem" }}>文章補完は執筆の効率を45%向上させています</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start" }}>
                      <div
                        style={{
                          marginRight: "0.5rem",
                          marginTop: "0.125rem",
                          backgroundColor: "rgba(0, 196, 159, 0.1)",
                          padding: "0.25rem",
                          borderRadius: "9999px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#00C49F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                          <path d="M9 18h6" />
                          <path d="M10 22h4" />
                        </svg>
                      </div>
                      <span style={{ fontSize: "0.875rem" }}>描写提案は読者エンゲージメントを30%向上させています</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start" }}>
                      <div
                        style={{
                          marginRight: "0.5rem",
                          marginTop: "0.125rem",
                          backgroundColor: "rgba(255, 187, 40, 0.1)",
                          padding: "0.25rem",
                          borderRadius: "9999px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FFBB28"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                          <path d="M9 18h6" />
                          <path d="M10 22h4" />
                        </svg>
                      </div>
                      <span style={{ fontSize: "0.875rem" }}>プロット提案は物語の展開力を15%向上させています</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
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
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>作品別パフォーマンス</h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>各作品のパフォーマンス指標を表示します</p>
        </div>
        <div style={{ padding: "1.5rem" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontWeight: 500, fontSize: "0.875rem" }}>
                    タイトル
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.75rem 1rem",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    閲覧数
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.75rem 1rem",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    いいね
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.75rem 1rem",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    コメント
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.75rem 1rem",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    エンゲージメント率
                  </th>
                </tr>
              </thead>
              <tbody>
                {novelPerformanceData.map((novel) => (
                  <tr
                    key={novel.id}
                    style={{
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                      }}
                    >
                      <Link
                        href={`/novel/${novel.id}`}
                        style={{
                          color: "var(--text-color)",
                          textDecoration: "none",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.textDecoration = "underline"
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.textDecoration = "none"
                        }}
                      >
                        {novel.title}
                      </Link>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {novel.views.toLocaleString()}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {novel.likes.toLocaleString()}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {novel.comments.toLocaleString()}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {novel.engagement}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <Link
            href="/dashboard/analytics"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "1px solid var(--border-color)",
              backgroundColor: "transparent",
              color: "var(--text-color)",
              textDecoration: "none",
            }}
          >
            詳細分析を見る
          </Link>
        </div>
      </div>
    </div>
  )
}
