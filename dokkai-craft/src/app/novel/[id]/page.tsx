"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ThumbsUp,
  Send,
  HelpCircle,
  Maximize2,
  Minimize2,
  EyeOff,
  Eye,
  Moon,
  Sun,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

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

export default function NovelPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
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

  const contentRef = useRef<HTMLDivElement>(null)
  const sentences = splitIntoSentences(novelData.content)

  // フルスクリーン切り替え
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        toast({
          title: "フルスクリーンエラー",
          description: `フルスクリーンモードに切り替えられませんでした: ${err.message}`,
          variant: "destructive",
        })
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

  // テーマの適用
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.dataset.theme = theme
    }
  }, [theme])

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
      toast({
        title: "コメントが入力されていません",
        description: "コメントを入力してください。",
      })
      return
    }

    // 実際の実装ではバックエンドにデータを送信
    toast({
      title: "コメントが投稿されました",
      description: ""
    })
    setSentenceCommentText("")
    setSelectedSentenceIndex(null)
  }

  // コメントを投稿
  const postComment = () => {
    if (!commentText.trim()) {
      toast({
        title: "コメントが入力されていません",
        description: "コメントを入力してください。",
      })
      return
    }

    // 実際の実装ではバックエンドにデータを送信
    toast({
      title: "コメントが投稿されました",
      description: ""
    })
    setCommentText("")
  }

  // AIに質問
  const askAI = async () => {
    if (!questionText.trim()) {
      toast({
        title: "質問が入力されていません",
        description: "質問を入力してください。",
      })
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
      toast({
        title: "エラーが発生しました",
        description: "AIサービスに接続できませんでした。後でもう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsAiLoading(false)
    }
  }

  // 特定の文に対するコメントを取得
  const getSentenceComments = (index: number) => {
    return novelData.sentenceComments.filter((comment) => comment.sentenceIndex === index)
  }

  // テーマクラスの取得
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 text-gray-100"
      case "sepia":
        return "bg-amber-50 text-amber-900"
      default:
        return "bg-white text-gray-900"
    }
  }

  return (
    <div
      className={cn(
        "transition-colors duration-300",
        isFullscreen ? "p-0 m-0" : "container mx-auto px-4 py-8",
        getThemeClasses(),
      )}
    >
      <div className={cn("grid gap-8", isFullscreen ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4")}>
        <div className={isFullscreen ? "col-span-1" : "lg:col-span-3"}>
          {!isFullscreen && (
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{novelData.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Link href={`/author/${novelData.authorId}`} className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt={novelData.author} />
                    <AvatarFallback>{novelData.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{novelData.author}</span>
                </Link>
                <span className="text-sm text-muted-foreground">
                  {novelData.genre} • 更新: {novelData.updatedAt}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLiked(!liked)}
                  className="gap-1"
                >
                  <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                  <span>{liked ? novelData.likes + 1 : novelData.likes}</span>
                </Button>
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBookmarked(!bookmarked)}
                  className="gap-1"
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
                  <span>{bookmarked ? novelData.bookmarks + 1 : novelData.bookmarks}</span>
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>共有</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>URLをコピーして共有</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}

          <Card className={cn(isFullscreen ? "border-0 shadow-none rounded-none" : "", getThemeClasses())}>
            <CardContent className={cn("p-6", isFullscreen ? "max-w-3xl mx-auto" : "")}>
              <div className="flex justify-between mb-4">
                {isFullscreen && <h1 className="text-2xl font-bold">{novelData.title}</h1>}
                <div className="flex items-center gap-2 ml-auto">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "sepia" : "light")}
                        >
                          {theme === "light" ? (
                            <Sun className="h-4 w-4" />
                          ) : theme === "dark" ? (
                            <Moon className="h-4 w-4" />
                          ) : (
                            <Sun className="h-4 w-4 text-amber-600" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>テーマ切り替え</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setShowComments(!showComments)}>
                          {showComments ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{showComments ? "コメントを非表示" : "コメントを表示"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isFullscreen ? "通常表示" : "全画面表示"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div
                ref={contentRef}
                className={cn(
                  "prose prose-sm sm:prose lg:prose-lg max-w-none",
                  theme === "dark" ? "prose-invert" : "",
                  theme === "sepia" ? "prose-amber" : "",
                  isFullscreen ? "text-lg" : "",
                )}
                onMouseUp={handleTextSelect}
                data-theme={theme}
              >
                {sentences.map((sentence, index) => {
                  const comments = getSentenceComments(index)
                  const hasComments = comments.length > 0

                  return (
                    <div key={index} className="relative group">
                      <p
                        className={cn(
                          "my-4 leading-relaxed inline",
                          hasComments && showComments ? "bg-yellow-100 dark:bg-yellow-900/30" : "",
                          selectedSentenceIndex === index ? "bg-blue-100 dark:bg-blue-900/30" : "",
                        )}
                        onClick={() => handleSentenceClick(index)}
                      >
                        {sentence}
                      </p>

                      {hasComments && showComments && (
                        <div className="ml-2 inline-block">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                  <MessageSquare className="h-3 w-3 text-blue-500" />
                                  <span className="sr-only">コメントを表示</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="right" className="w-80">
                                <div className="space-y-2">
                                  {comments.map((comment) => (
                                    <div key={comment.id} className="text-sm">
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-5 w-5">
                                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{comment.user.name}</span>
                                      </div>
                                      <p className="mt-1">{comment.text}</p>
                                    </div>
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>

            {!isFullscreen && (
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>{novelData.views.toLocaleString()} 閲覧</span>
                </div>
                <div className="flex gap-2">
                  {selectedSentenceIndex !== null && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          選択した文にコメント
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>選択した文にコメント</DialogTitle>
                          <DialogDescription>
                            選択した文: <q className="italic">{sentences[selectedSentenceIndex]}</q>
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          placeholder="この部分についてのコメントを書いてください..."
                          value={sentenceCommentText}
                          onChange={(e) => setSentenceCommentText(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <DialogFooter>
                          <Button onClick={postSentenceComment}>投稿する</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  {selectedText && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          選択部分にコメント
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>選択部分にコメント</DialogTitle>
                          <DialogDescription>
                            選択したテキスト: <q className="italic">{selectedText}</q>
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          placeholder="この部分についてのコメントを書いてください..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <DialogFooter>
                          <Button onClick={postComment}>投稿する</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        AIに質問
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>物語についてAIに質問</DialogTitle>
                        <DialogDescription>物語の設定や登場人物について質問できます</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="例: 「勇者の証」とは何ですか？"
                          value={questionText}
                          onChange={(e) => setQuestionText(e.target.value)}
                          className="min-h-[80px]"
                        />
                        {aiResponse && (
                          <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-line">{aiResponse}</div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button onClick={askAI} disabled={isAiLoading}>
                          {isAiLoading ? "処理中..." : "質問する"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            )}
          </Card>

          {!isFullscreen && (
            <div className="mt-8">
              <Tabs defaultValue="comments">
                <TabsList className="mb-4">
                  <TabsTrigger value="comments">コメント ({novelData.comments.length})</TabsTrigger>
                  <TabsTrigger value="sentenceComments">文コメント ({novelData.sentenceComments.length})</TabsTrigger>
                  <TabsTrigger value="chapters">章一覧 ({novelData.chapters.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="comments">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">コメントを投稿</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="ユーザー" />
                          <AvatarFallback>ユ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="この作品についてのコメントを書いてください..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="mb-2"
                          />
                          <Button onClick={postComment} className="ml-auto">
                            <Send className="mr-2 h-4 w-4" />
                            投稿
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent>
                      <div className="space-y-4">
                        {novelData.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-4 pb-4 border-b">
                            <Avatar>
                              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{comment.user.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm mb-2">{comment.text}</p>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                <span className="text-xs">{comment.likes}</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="sentenceComments">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">文単位のコメント</CardTitle>
                      <CardDescription>特定の文に対するコメントを表示します</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {novelData.sentenceComments.map((comment) => (
                          <div key={comment.id} className="flex gap-4 pb-4 border-b">
                            <Avatar>
                              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{comment.user.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="bg-muted p-2 rounded-md mb-2 text-sm">
                                <q>{sentences[comment.sentenceIndex]}</q>
                              </div>
                              <p className="text-sm mb-2">{comment.text}</p>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                <span className="text-xs">{comment.likes}</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="chapters">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">章一覧</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {novelData.chapters.map((chapter) => (
                          <div
                            key={chapter.id}
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                          >
                            <span className="font-medium">{chapter.title}</span>
                            {chapter.published ? (
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/novel/${novelData.id}/chapter/${chapter.id}`}>読む</Link>
                              </Button>
                            ) : (
                              <span className="text-sm text-muted-foreground">準備中</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        {!isFullscreen && (
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">作者について</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt={novelData.author} />
                    <AvatarFallback>{novelData.author[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{novelData.author}</h3>
                  <p className="text-sm text-muted-foreground">ファンタジー作家</p>
                </div>
                <Button className="w-full mb-2">フォローする</Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/author/${novelData.authorId}`}>作品一覧を見る</Link>
                </Button>
              </CardContent>
              <CardHeader className="border-t pt-4">
                <CardTitle className="text-lg">おすすめ作品</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((id) => (
                    <Link key={id} href={`/novel/${id}`} className="flex items-start gap-2 group">
                      <div className="w-12 h-16 bg-muted rounded-sm flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm group-hover:underline line-clamp-2">
                          {id === 1 ? "魔法学園の天才少女" : id === 2 ? "剣と魔法の冒険譚" : "未来都市の探偵"}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {id === 1 ? "佐藤花子" : id === 2 ? "山田太郎" : "鈴木一郎"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

