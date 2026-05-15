import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { TALLER_CONFIG, ESPARRAGOS_CONFIG } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, asunto, mensaje } = body;

    // Determinar destinatario según el asunto
    let destinatario = ESPARRAGOS_CONFIG.email; // Por defecto: donremondocalle@hotmail.com
    let asuntoTexto = "Consulta general";

    if (asunto === "taller" || asunto === "coches") {
      destinatario = TALLER_CONFIG.email; // remondocoches@hotmail.com
      asuntoTexto = asunto === "taller" ? "Consulta Taller" : "Consulta Coches";
    } else if (asunto === "productos") {
      asuntoTexto = "Consulta Productos Frescos";
    } else if (asunto === "otro") {
      asuntoTexto = "Otra consulta";
    }

    // Configurar transporte SMTP
    // Se requiere configurar EMAIL_USER y EMAIL_PASS en el .env
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // Servidor SMTP de Hotmail/Outlook
      port: 587,
      secure: false, // true para port 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false, // A veces necesario para Hotmail
      },
    });

    // Construir el HTML del email
    const htmlContent = `
      <h2>Nuevo mensaje desde la web de Don Remondo</h2>
      <p><strong>Asunto:</strong> ${asuntoTexto}</p>
      <hr />
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono || "No especificado"}</p>
      <br />
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje.replace(/\n/g, "<br/>")}</p>
    `;

    // Enviar el email
    await transporter.sendMail({
      from: `"Web Don Remondo" <${process.env.EMAIL_USER}>`, // El remitente DEBE ser la cuenta autenticada
      to: destinatario,
      replyTo: email, // Para poder responder directamente al cliente
      subject: `Nuevo mensaje web: ${asuntoTexto}`,
      html: htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al enviar email:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
