import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "coches");

function sanitizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "")
    .replace(/-+/g, "-");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No se recibieron archivos" }, { status: 400 });
    }

    const urls: string[] = [];

    // Buscar el token con prefijo VERCEL o BLOB
    const blobToken = process.env.VERCEL_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;

    if (blobToken) {
      // Subir a Vercel Blob
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const blobPath = `coches/${uniqueSuffix}-${sanitizeName(file.name)}`;

        const blob = await put(blobPath, file, {
          access: "public",
          token: blobToken,
        });
        urls.push(blob.url);
      }
    } else {
      // Fallback local
      await mkdir(UPLOAD_DIR, { recursive: true });
      
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;

        const ext = file.name.split(".").pop() ?? "jpg";
        const baseName = sanitizeName(file.name.replace(/\.[^.]+$/, ""));
        const uniqueName = `${Date.now()}-${baseName}.${ext}`;

        const filePath = path.join(UPLOAD_DIR, uniqueName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);
        urls.push(`/uploads/coches/${uniqueName}`);
      }
    }

    return NextResponse.json({ urls });
  } catch (err: any) {
    console.error("[upload] error:", err);
    return NextResponse.json({ error: `Error interno: ${err.message || String(err)}` }, { status: 500 });
  }
}
