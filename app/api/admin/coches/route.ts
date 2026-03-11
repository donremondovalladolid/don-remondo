import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// GET: listar todos
export async function GET() {
  const coches = await prisma.coche.findMany({
    orderBy: [{ vendido: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(coches);
}

// POST: crear coche
export async function POST(request: Request) {
  const body = await request.json();
  const baseSlug = slugify(`${body.marca}-${body.modelo}-${body.anio}`);
  // Aseguramos slug único
  const existing = await prisma.coche.count({ where: { slug: { startsWith: baseSlug } } });
  const slug = existing > 0 ? `${baseSlug}-${existing + 1}` : baseSlug;

  const coche = await prisma.coche.create({
    data: {
      slug,
      marca: body.marca,
      modelo: body.modelo,
      anio: Number(body.anio),
      km: Number(body.km),
      precio: Number(body.precio),
      combustible: body.combustible,
      cambio: body.cambio || "Manual",
      color: body.color || "",
      puertas: Number(body.puertas) || 5,
      descripcion: body.descripcion || "",
      fotos: JSON.stringify(body.fotos || []),
      vendido: false,
      destacado: body.destacado || false,
    },
  });
  return NextResponse.json(coche, { status: 201 });
}
