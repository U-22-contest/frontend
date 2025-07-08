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


    try {
        const response = await fetch(`${process.env.NESTJS_API_URL || 'http://localhost:4000'}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: body.username,
                email: body.email,
                password: body.password,
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
        console.log("data:", user);

        return NextResponse.json(
            {
                message: "登録が完了しました",
                user: {
                    id: data.user.id,
                    username: data.user.name,
                    email: data.user.email,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('signup error:', error);
        return null;
    }
}
