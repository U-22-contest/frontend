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
        if (credentials.email === "user@example.com" && credentials.password === "password") {
          return {
            id: "1",
            name: "テストユーザー",
            email: "user@example.com",
            image: "/placeholder.svg?height=32&width=32",
          }
        }

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

