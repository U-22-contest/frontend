import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini APIクライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { text, genre, ai_provider = 'gemini' } = await request.json();

        if (!text) {
            return NextResponse.json(
                { error: 'テキストが提供されていません' },
                { status: 400 }
            );
        }

        if (ai_provider === 'gemini') {
            // Gemini APIを使用
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const genre_context = genre ? `このテキストは${genre}ジャンルの小説です。そのジャンルの特徴を活かした描写を提案してください。` : '';

            const prompt = `あなたは小説執筆を支援するAIアシスタントです。与えられたテキストに対して、より豊かで魅力的な描写の案を3つ提案してください。各案は元のテキストを置き換えるもので、感情、五感、環境などの要素を取り入れてください。${genre_context}

以下のテキストをより豊かな描写に改善する案を3つ提案してください:

${text}

回答は以下の形式でお願いします:
1. [改善案1]
2. [改善案2]
3. [改善案3]`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text_response = response.text();

            // 提案を分割
            const suggestions: string[] = [];
            const lines = text_response.split('\n');
            let current_suggestion = '';

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine.match(/^[1-3]\./)) {
                    if (current_suggestion) {
                        suggestions.push(current_suggestion.trim());
                        current_suggestion = '';
                    }
                } else if (trimmedLine && !trimmedLine.startsWith('提案') && !trimmedLine.startsWith('回答')) {
                    current_suggestion += ' ' + trimmedLine;
                }
            }

            if (current_suggestion) {
                suggestions.push(current_suggestion.trim());
            }

            // 提案が3つない場合は調整
            while (suggestions.length < 3) {
                suggestions.push(text);
            }

            return NextResponse.json({ suggestions: suggestions.slice(0, 3) });
        } else {
            return NextResponse.json(
                { error: 'サポートされていないAIプロバイダーです' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('描写提案エラー:', error);
        return NextResponse.json(
            { error: 'AIサービスでエラーが発生しました' },
            { status: 500 }
        );
    }
} 