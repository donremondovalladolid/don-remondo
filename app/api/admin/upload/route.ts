import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Ruta absoluta a public/uploads/coches (relativa al proceso de Next.js)
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

    // Asegurar que el directorio existe
    await mkdir(UPLOAD_DIR, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      // Validar que es imagen
      if (!file.type.startsWith("image/")) continue;

      const ext = file.name.split(".").pop() ?? "jpg";
      const baseName = sanitizeName(file.name.replace(/\.[^.]+$/, ""));
      const uniqueName = `${Date.now()}-${baseName}.${ext}`;
      const filePath = path.join(UPLOAD_DIR, uniqueName);

      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);

      urls.push(`/uploads/coches/${uniqueName}`);
    }

    return NextResponse.json({ urls });
  } catch (err) {
    console.error("[upload] error:", err);
    return NextResponse.json({ error: "Error al subir los archivos" }, { status: 500 });
  }
}
