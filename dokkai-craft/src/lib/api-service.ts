// FastAPIバックエンドとの通信を担当するサービス

// AIによる文章補完を取得
export async function getAICompletion(content: string, genre?: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        genre,
      }),
    })

    if (!response.ok) {
      throw new Error("AI APIからのレスポンスが正常ではありません")
    }

    return await response.json()
  } catch (error) {
    console.error("AI補完の取得に失敗しました:", error)
    throw error
  }
}

// 描写の提案を取得
export async function getDescriptionSuggestions(text: string, genre?: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/describe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        genre,
      }),
    })

    if (!response.ok) {
      throw new Error("AI APIからのレスポンスが正常ではありません")
    }

    return await response.json()
  } catch (error) {
    console.error("描写提案の取得に失敗しました:", error)
    throw error
  }
}

// 物語に関する質問への回答を取得
export async function askAboutStory(novelId: string, question: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novel_id: novelId,
        question,
      }),
    })

    if (!response.ok) {
      throw new Error("AI APIからのレスポンスが正常ではありません")
    }

    return await response.json()
  } catch (error) {
    console.error("質問への回答の取得に失敗しました:", error)
    throw error
  }
}

