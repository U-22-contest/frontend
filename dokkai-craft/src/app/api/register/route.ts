import { NextResponse } from "next/server"

type NewUser = {
    username: string
    email: string
    password: string
}

export async function POST(request: Request) {
    const body = (await request.json()) as NewUser


    if (!body.username || !body.email || !body.password) {
        return NextResponse.json({ message: "missing field" }, { status: 400 })
    }

    // ────────────────────────────────
    // ここで DB 保存やパスワードハッシュ化を行う想定
    // ────────────────────────────────
    console.log("🆕 user registered:", body)

    return NextResponse.json({ message: "ok" }, { status: 200 })
}
