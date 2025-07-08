import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini APIクライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { content, genre, ai_provider = 'gemini' } = await request.json();

        if (!content) {
            return NextResponse.json(
                { error: 'コンテンツが提供されていません' },
                { status: 400 }
            );
        }

        if (ai_provider === 'gemini') {
            // Gemini APIを使用
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const genre_context = genre ? `このテキストは${genre}ジャンルの小説です。そのジャンルの特徴を活かした続きを提案してください。` : '';

            const prompt = `あなたは小説執筆を支援するAIアシスタントです。与えられた文章の続きとして、3つの異なる案を提案してください。各案は2〜3文程度で、物語の流れを自然に発展させるものにしてください。${genre_context}

以下の文章の続きを3つ提案してください:

${content}

回答は以下の形式でお願いします:
1. [提案1]
2. [提案2] 
3. [提案3]`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // 提案を分割
            const suggestions: string[] = [];
            // dotAllフラグ(s)を使わず、1. [提案1] 〜 3. [提案3] で分割
            const parts = text.split(/\d\. \[提案\d\]/).map(s => s.trim()).filter(Boolean);
            for (const part of parts) {
                if (part) {
                    suggestions.push(part); // contentを連結せず、AIの提案部分だけをpush
                }
            }
            // 提案が3つない場合は調整
            while (suggestions.length < 3) {
                suggestions.push('物語はさらに展開していきます...');
            }
            return NextResponse.json({ suggestions: suggestions.slice(0, 3) });
        } else {
            return NextResponse.json(
                { error: 'サポートされていないAIプロバイダーです' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('文章補完エラー:', error);
        return NextResponse.json(
            { error: 'AIサービスでエラーが発生しました' },
            { status: 500 }
        );
    }
} 