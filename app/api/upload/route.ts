import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Usar Vercel Blob si el token está configurado (Producción)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name.replace(/\s+/g, "_"), file, {
        access: 'public',
      });
      return NextResponse.json({ url: blob.url });
    } 
    
    // Fallback a sistema de archivos local (Desarrollo)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
