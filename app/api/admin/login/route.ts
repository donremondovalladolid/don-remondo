import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;

  if (email === validEmail && password === validPassword && secretToken) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin-token", secretToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
}
