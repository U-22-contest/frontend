// FastAPIバックエンドとの通信を担当するサービス

// APIサービスの型定義
export interface CompletionRequest {
  content: string;
  genre?: string;
  ai_provider?: "openai" | "gemini";
}

export interface DescriptionRequest {
  text: string;
  genre?: string;
  ai_provider?: "openai" | "gemini";
}

export interface QuestionRequest {
  novel_id: string;
  question: string;
  ai_provider?: "openai" | "gemini";
}

export interface AIResponse {
  suggestions: string[];
}

export interface QuestionResponse {
  answer: string;
}

// APIサービスクラス
class ApiService {
  // 文章補完
  async completeText(request: CompletionRequest): Promise<AIResponse> {
    try {
      const response = await fetch('/api/ai/complete', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: request.content,
          genre: request.genre,
          ai_provider: request.ai_provider || "gemini", // デフォルトはGemini
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("文章補完エラー:", error);
      throw error;
    }
  }

  // 描写提案
  async suggestDescriptions(request: DescriptionRequest): Promise<AIResponse> {
    try {
      const response = await fetch('/api/ai/describe', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: request.text,
          genre: request.genre,
          ai_provider: request.ai_provider || "gemini", // デフォルトはGemini
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("描写提案エラー:", error);
      throw error;
    }
  }

  // 質問応答（将来的な拡張用）
  async answerQuestion(request: QuestionRequest): Promise<QuestionResponse> {
    try {
      const response = await fetch('/api/ai/ask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          novel_id: request.novel_id,
          question: request.question,
          ai_provider: request.ai_provider || "gemini", // デフォルトはGemini
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("質問応答エラー:", error);
      throw error;
    }
  }

  // ヘルスチェック
  async healthCheck(): Promise<{ status: string; ai_providers: string[] }> {
    try {
      const response = await fetch('/api/health');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("ヘルスチェックエラー:", error);
      throw error;
    }
  }
}

// シングルトンインスタンス
export const apiService = new ApiService();
