import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Edit, TrendingUp, Bell } from "lucide-react"

export default function Home() {
  // 人気の小説データ (実際の実装ではAPIから取得)
  const popularNovels = [
    { id: 1, title: "異世界転生物語", author: "山田太郎", genre: "ファンタジー", views: 12500 },
    { id: 2, title: "都会の片隅で", author: "佐藤花子", genre: "日常", views: 8700 },
    { id: 3, title: "未来からの手紙", author: "鈴木一郎", genre: "SF", views: 10200 },
    { id: 4, title: "恋する魔法使い", author: "高橋恵", genre: "ロマンス", views: 9300 },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex flex-col items-center text-center mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">物語を創り、共有する場所</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            AIの力で執筆をサポート。読者とのつながりを深める新しい小説プラットフォーム
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild size="lg">
              <Link href="/write">
                <Edit className="mr-2 h-4 w-4" /> 執筆を始める
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/explore">
                <BookOpen className="mr-2 h-4 w-4" /> 作品を探す
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">人気の作品</h2>
          <Button variant="ghost" asChild>
            <Link href="/rankings">もっと見る</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularNovels.map((novel) => (
            <Card key={novel.id} className="transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 text-lg">{novel.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">作者: {novel.author}</p>
                <p className="text-sm text-muted-foreground">ジャンル: {novel.genre}</p>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{novel.views.toLocaleString()} 閲覧</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/novel/${novel.id}`}>読む</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>執筆者の方へ</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 bg-primary/10 p-1 rounded-full">
                  <Edit className="h-4 w-4 text-primary" />
                </div>
                <span>AIによる文章補完で執筆をスムーズに</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 bg-primary/10 p-1 rounded-full">
                  <Edit className="h-4 w-4 text-primary" />
                </div>
                <span>場面描写の提案機能で創作の幅を広げる</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/write">執筆を始める</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>読者の方へ</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 bg-primary/10 p-1 rounded-full">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <span>本文中で質問や感想を投稿できる</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-0.5 bg-primary/10 p-1 rounded-full">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <span>お気に入り作家の更新を通知で受け取る</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/explore">作品を探す</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}

