import NextAuth from "next-auth"
import type { DefaultSession, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import type { JWT } from "next-auth/jwt"

// セッションの型を拡張
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
  }
}

// 実際の実装ではNest.jsバックエンドと連携
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
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
    async jwt({ token, user }: { token: JWT; user?: { id: string } }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ token, session }: { token: JWT; session: import("next-auth").Session }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

