"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { BookOpen, Heart, MessageSquare, Users, TrendingUp, Wand2 } from "lucide-react"

// モックデータ
const overviewData = {
  totalViews: 45280,
  totalLikes: 3621,
  totalComments: 892,
  followers: 412,
  novels: 8,
  aiUsage: 76, // AI提案の活用率（%）
}

const viewsData = [
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

const engagementData = [
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

const aiUsageData = [
  { name: "文章補完", value: 45 },
  { name: "描写提案", value: 30 },
  { name: "プロット提案", value: 15 },
  { name: "キャラクター設定", value: 10 },
]

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <p className="text-muted-foreground">あなたの作品のパフォーマンスを確認しましょう</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="期間を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">過去7日間</SelectItem>
              <SelectItem value="month">過去30日間</SelectItem>
              <SelectItem value="year">過去12ヶ月</SelectItem>
              <SelectItem value="all">全期間</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">総閲覧数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{overviewData.totalViews.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +12.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">総いいね数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{overviewData.totalLikes.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +8.3%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">総コメント数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{overviewData.totalComments.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +15.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">フォロワー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{overviewData.followers.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +5.7%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">エンゲージメント率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">8.9%</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +1.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI提案活用率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wand2 className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{overviewData.aiUsage}%</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">前月比 +4.5%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="views" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="views">閲覧数</TabsTrigger>
          <TabsTrigger value="engagement">エンゲージメント</TabsTrigger>
          <TabsTrigger value="ai-usage">AI活用状況</TabsTrigger>
        </TabsList>
        <TabsContent value="views">
          <Card>
            <CardHeader>
              <CardTitle>閲覧数の推移</CardTitle>
              <CardDescription>月別の総閲覧数の推移を表示します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={viewsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>エンゲージメントの推移</CardTitle>
              <CardDescription>月別のいいね数とコメント数の推移を表示します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={engagementData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" name="いいね" />
                    <Bar dataKey="comments" fill="#82ca9d" name="コメント" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-usage">
          <Card>
            <CardHeader>
              <CardTitle>AI提案の活用状況</CardTitle>
              <CardDescription>AI機能の種類別活用状況を表示します</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-center">
              <div className="h-[300px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={aiUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {aiUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
                <h3 className="text-lg font-medium mb-2">AI機能の活用ポイント</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-[#0088FE]/10 p-1 rounded-full">
                      <Wand2 className="h-4 w-4 text-[#0088FE]" />
                    </div>
                    <span className="text-sm">文章補完は執筆の効率を45%向上させています</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-[#00C49F]/10 p-1 rounded-full">
                      <Wand2 className="h-4 w-4 text-[#00C49F]" />
                    </div>
                    <span className="text-sm">描写提案は読者エンゲージメントを30%向上させています</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-[#FFBB28]/10 p-1 rounded-full">
                      <Wand2 className="h-4 w-4 text-[#FFBB28]" />
                    </div>
                    <span className="text-sm">プロット提案は物語の展開力を15%向上させています</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>作品別パフォーマンス</CardTitle>
          <CardDescription>各作品のパフォーマンス指標を表示します</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>タイトル</TableHead>
                <TableHead className="text-right">閲覧数</TableHead>
                <TableHead className="text-right">いいね</TableHead>
                <TableHead className="text-right">コメント</TableHead>
                <TableHead className="text-right">エンゲージメント率</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {novelPerformanceData.map((novel) => (
                <TableRow key={novel.id}>
                  <TableCell className="font-medium">
                    <Link href={`/novel/${novel.id}`} className="hover:underline">
                      {novel.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">{novel.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{novel.likes.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{novel.comments.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{novel.engagement}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="ml-auto">
            <Link href="/dashboard/analytics">詳細分析を見る</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

