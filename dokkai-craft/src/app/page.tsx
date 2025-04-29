import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Edit, TrendingUp, Bell } from "lucide-react"
import config from "../tailwind.config"
import Navbar from "@/components/navbar"
const { theme } = config

export default function Home() {
  // 人気の小説データ (実際の実装ではAPIから取得)
  const popularNovels = [
    { id: 1, title: "異世界転生物語", author: "山田太郎", genre: "ファンタジー", views: 12500 },
    { id: 2, title: "都会の片隅で", author: "佐藤花子", genre: "日常", views: 8700 },
    { id: 3, title: "未来からの手紙", author: "鈴木一郎", genre: "SF", views: 10200 },
    { id: 4, title: "恋する魔法使い", author: "高橋恵", genre: "ロマンス", views: 9300 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* ヒーローセクション */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6">物語を創り、共有する場所</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              AIの力で執筆をサポート。読者とのつながりを深める新しい小説プラットフォーム
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/write">
                <Button size="lg" className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" /> 執筆を始める
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" size="lg" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" /> 作品を探す
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 人気作品セクション */}
        <section className="py-12 bg-background">
          <div className="mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">人気の作品</h2>
              <Link href="/more" className="text-sm text-primary hover:underline">
                もっと見る
              </Link>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-1 gap-6 m-3">
              {popularNovels.map((novel) => (
                <Card key={novel.id} className="overflow-hidden transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">{novel.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3">
                    <div className="text-sm text-muted-foreground">
                      <p>作者: {novel.author}</p>
                      <p className="mt-1">ジャンル: {novel.genre}</p>
                      <div className="flex items-center mt-3">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>{novel.views.toLocaleString()} 閲覧</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      読む
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ユーザー案内セクション */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 執筆者向け */}
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">執筆者の方へ</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                        <Edit className="h-4 w-4 text-primary" />
                      </div>
                      <span>AIによる文章補完で執筆をスムーズに</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                        <Edit className="h-4 w-4 text-primary" />
                      </div>
                      <span>場面描写の提案機能で創作の幅を広げる</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">執筆を始める</Button>
                </CardFooter>
              </Card>

              {/* 読者向け */}
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">読者の方へ</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <span>本文中で質問や感想を投稿できる</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <span>お気に入り作家の更新を通知で受け取る</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">作品を探す</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}