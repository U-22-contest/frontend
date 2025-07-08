'use client';

import { useSession } from 'next-auth/react';

export default function TestPage() {
    const { data: session, status } = useSession();

    return (
        <div style={{ padding: '20px' }}>
            <h1>認証テストページ</h1>

            <div style={{ marginBottom: '20px' }}></div>

            <div style={{ marginBottom: '20px' }}>
                <h3>セッションデータ:</h3>
                <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
                    {JSON.stringify(session, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>ユーザー情報:</h3>
                {session?.user ? (
                    <ul>
                        <li>ID: {session.user.id}</li>
                        <li>名前: {session.user.name || 'なし'}</li>
                        <li>メール: {session.user.email || 'なし'}</li>
                    </ul>
                ) : (
                    <p>ユーザー情報なし</p>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>アクセストークン:</h3>
                <p>{session?.accessToken ? '✅ トークン保存済み' : '❌ トークンなし'}</p>
                {session?.accessToken && (
                    <details>
                        <summary>トークンを表示</summary>
                        <pre style={{
                            backgroundColor: '#f5f5f5',
                            padding: '10px',
                            borderRadius: '5px',
                            fontSize: '12px',
                            wordBreak: 'break-all'
                        }}>
                            {session.accessToken}
                        </pre>
                    </details>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>認証状態チェック:</h3>
                <ul>
                    <li>セッション存在: {session ? '✅' : '❌'}</li>
                    <li>ユーザーID存在: {session?.user?.id ? '✅' : '❌'}</li>
                    <li>トークン存在: {session?.accessToken ? '✅' : '❌'}</li>
                    <li>認証済み: {status === 'authenticated' ? '✅' : '❌'}</li>
                </ul>
            </div>

            <button
                onClick={() => {
                    console.log('Session:', session);
                    console.log('Status:', status);
                    console.log('User ID:', session?.user?.id);
                    console.log('Access Token:', session?.accessToken);
                }}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                コンソールにセッション情報を出力
            </button>
        </div>
    );
}