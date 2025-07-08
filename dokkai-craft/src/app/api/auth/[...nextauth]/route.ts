/* eslint-disable */
// @ts-nocheck - この行でTypeScriptの型チェックを無効化
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        // 実際の実装ではバックエンドAPIを呼び出して認証
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // モックユーザー（実際の実装では削除）
        // if (credentials.email === "user@example.com" && credentials.password === "password") {
        //   return {
        //     id: "1",
        //     name: "テストユーザー",
        //     email: "user@example.com",
        //     image: "/placeholder.svg?height=32&width=32",
        //   }
        // }
        //
        // return null

        try {
          const response = await fetch(`${process.env.NESTJS_API_URL || 'http://localhost:4000'}/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) return null;

          const data = await response.json();

          const user = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.username,
            accessToken: data.token,
          };
          return user

        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userId = user.id;
      }
      return token
    },
    async session({ token, session }) {
      if ( token.userId && token.accessToken ) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }