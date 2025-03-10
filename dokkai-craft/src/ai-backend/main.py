from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
from dotenv import load_dotenv
import logging
from openai import OpenAI

# 環境変数の読み込み
load_dotenv()

# ロギングの設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# OpenAI APIクライアントの初期化
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(title="NovelAI API", description="小説執筆支援のためのAI API")

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では特定のオリジンのみを許可する
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# リクエスト/レスポンスモデル
class CompletionRequest(BaseModel):
    content: str
    genre: Optional[str] = None

class DescriptionRequest(BaseModel):
    text: str
    genre: Optional[str] = None

class QuestionRequest(BaseModel):
    novel_id: str
    question: str

class AIResponse(BaseModel):
    suggestions: List[str]

class QuestionResponse(BaseModel):
    answer: str

# 文章補完エンドポイント
@app.post("/complete", response_model=AIResponse)
async def complete_text(request: CompletionRequest):
    try:
        logger.info(f"文章補完リクエスト: {request.content[:100]}...")
        
        # ジャンルに応じたプロンプトの調整
        genre_context = ""
        if request.genre:
            genre_context = f"このテキストは{request.genre}ジャンルの小説です。そのジャンルの特徴を活かした続きを提案してください。"
        
        # OpenAI APIを使用して文章補完
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"あなたは小説執筆を支援するAIアシスタントです。与えられた文章の続きとして、3つの異なる案を提案してください。各案は2〜3文程度で、物語の流れを自然に発展させるものにしてください。{genre_context}"},
                {"role": "user", "content": f"以下の文章の続きを3つ提案してください:\n\n{request.content}"}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        # レスポンスの処理
        content = response.choices[0].message.content
        
        # 提案を分割（実際の実装ではより堅牢な方法が必要）
        suggestions = []
        for line in content.split("\n"):
            if line.strip() and not line.startswith(("1.", "2.", "3.", "案1", "案2", "案3")):
                if len(suggestions) < 3:
                    suggestions.append(request.content + " " + line.strip())
        
        # 提案が3つない場合は調整
        while len(suggestions) < 3:
            suggestions.append(request.content + " 物語はさらに展開していきます...")
        
        return AIResponse(suggestions=suggestions)
    
    except Exception as e:
        logger.error(f"文章補完エラー: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 描写提案エンドポイント
@app.post("/describe", response_model=AIResponse)
async def suggest_descriptions(request: DescriptionRequest):
    try:
        logger.info(f"描写提案リクエスト: {request.text[:100]}...")
        
        # ジャンルに応じたプロンプトの調整
        genre_context = ""
        if request.genre:
            genre_context = f"このテキストは{request.genre}ジャンルの小説です。そのジャンルの特徴を活かした描写を提案してください。"
        
        # OpenAI APIを使用して描写提案
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"あなたは小説執筆を支援するAIアシスタントです。与えられたテキストに対して、より豊かで魅力的な描写の案を3つ提案してください。各案は元のテキストを置き換えるもので、感情、五感、環境などの要素を取り入れてください。{genre_context}"},
                {"role": "user", "content": f"以下のテキストをより豊かな描写に改善する案を3つ提案してください:\n\n{request.text}"}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        # レスポンスの処理
        content = response.choices[0].message.content
        
        # 提案を分割（実際の実装ではより堅牢な方法が必要）
        suggestions = []
        current_suggestion = ""
        for line in content.split("\n"):
            if line.strip():
                if line.startswith(("1.", "2.", "3.", "案1", "案2", "案3")):
                    if current_suggestion:
                        suggestions.append(current_suggestion.strip())
                        current_suggestion = ""
                else:
                    current_suggestion += " " + line.strip()
        
        if current_suggestion:
            suggestions.append(current_suggestion.strip())
        
        # 提案が3つない場合は調整
        while len(suggestions) < 3:
            suggestions.append(request.text)
        
        return AIResponse(suggestions=suggestions[:3])
    
    except Exception as e:
        logger.error(f"描写提案エラー: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# 質問応答エンドポイント
@app.post("/ask", response_model=QuestionResponse)
async def answer_question(request: QuestionRequest):
    try:
        logger.info(f"質問応答リクエスト: novel_id={request.novel_id}, question={request.question}")
        
        # 実際の実装では、ここでnovel_idを使って小説の内容をデータベースから取得する
        # この例ではモックデータを使用
        novel_content = """
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
        """
        
        # OpenAI APIを使用して質問に回答
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "あなたは小説の内容について質問に答えるAIアシスタントです。小説の設定、登場人物、世界観などについて、小説の内容に基づいて回答してください。小説に明示されていない情報については、小説の文脈から合理的に推測して回答してください。"},
                {"role": "user", "content": f"以下の小説について質問に答えてください:\n\n{novel_content}\n\n質問: {request.question}"}
            ],
            temperature=0.5,
            max_tokens=500
        )
        
        # レスポンスの処理
        answer = response.choices[0].message.content
        
        return QuestionResponse(answer=answer)
    
    except Exception as e:
        logger.error(f"質問応答エラー: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# ヘルスチェックエンドポイント
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

