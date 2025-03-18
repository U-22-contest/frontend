"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Wand2, Save, BookOpen, HelpCircle, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WritePage() {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

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
      toast({
        title: "エラーが発生しました",
        description: "AIサービスに接続できませんでした。後でもう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // 描写の提案を取得
  const getDescriptionSuggestions = async () => {
    if (!selectedText) {
      toast({
        title: "テキストが選択されていません",
        description: "描写の提案を受けるには、テキストを選択してください。",
      })
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
      toast({
        title: "エラーが発生しました",
        description: "AIサービスに接続できませんでした。後でもう一度お試しください。",
        variant: "destructive",
      })
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
      toast({
        title: "タイトルが入力されていません",
        description: "作品を保存するには、タイトルを入力してください。",
      })
      return
    }

    // 実際の実装ではバックエンドにデータを送信
    toast({
      title: "作品が保存されました",
      description: "下書きとして保存しました。",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-6">
            <Input
              placeholder="タイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select defaultValue="fantasy">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ジャンルを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fantasy">ファンタジー</SelectItem>
                  <SelectItem value="sf">SF</SelectItem>
                  <SelectItem value="romance">恋愛</SelectItem>
                  <SelectItem value="mystery">ミステリー</SelectItem>
                  <SelectItem value="daily">日常</SelectItem>
                </SelectContent>
              </Select>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ジャンルを選択すると、AIがそのジャンルに適した提案をします</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={saveNovel}>
                <Save className="mr-2 h-4 w-4" />
                保存
              </Button>
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                プレビュー
              </Button>
            </div>
          </div>

          <Textarea
            placeholder="ここに物語を書き始めましょう..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onMouseUp={handleTextSelect}
            className="min-h-[60vh] text-base leading-relaxed resize-none"
          />

          <div className="mt-4 flex justify-between">
            <Button onClick={handleAIComplete} disabled={isGenerating || !content} className="gap-2">
              <Wand2 className="h-4 w-4" />
              AIで続きを書く
            </Button>
            <Button
              onClick={getDescriptionSuggestions}
              disabled={isGenerating || !selectedText}
              variant="outline"
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              選択部分の描写を改善
            </Button>
          </div>
        </div>

        {aiSuggestions.length > 0 && (
          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AIの提案</CardTitle>
                <CardDescription>
                  {selectedText ? "選択したテキストの描写の改善案です" : "物語の続きの提案です"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer"
                      onClick={() => applySuggestion(suggestion)}
                    >
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => setAiSuggestions([])}>
                  閉じる
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

