import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // Por ahora guardamos en consola. Para envío real de email,
  // conectar Resend o Nodemailer con las credenciales del servidor.
  console.log("Nuevo mensaje de contacto:", body);
  // TODO: integrar Resend para envío real
  // await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' })
  return NextResponse.json({ ok: true });
}
