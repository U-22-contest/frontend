import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

// 実際の実装ではNest.jsバックエンドと連携
const handler = NextAuth({
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
    async session({  token , session }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }

