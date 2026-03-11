import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// GET: obtener uno
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const coche = await prisma.coche.findUnique({ where: { id: Number(id) } });
  if (!coche) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(coche);
}

// PATCH: actualizar
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const coche = await prisma.coche.update({
    where: { id: Number(id) },
    data: {
      ...(body.marca && { marca: body.marca }),
      ...(body.modelo && { modelo: body.modelo }),
      ...(body.anio && { anio: Number(body.anio) }),
      ...(body.km !== undefined && { km: Number(body.km) }),
      ...(body.precio !== undefined && { precio: Number(body.precio) }),
      ...(body.combustible && { combustible: body.combustible }),
      ...(body.cambio && { cambio: body.cambio }),
      ...(body.color !== undefined && { color: body.color }),
      ...(body.puertas && { puertas: Number(body.puertas) }),
      ...(body.descripcion !== undefined && { descripcion: body.descripcion }),
      ...(body.fotos && { fotos: JSON.stringify(body.fotos) }),
      ...(body.vendido !== undefined && { vendido: body.vendido }),
      ...(body.destacado !== undefined && { destacado: body.destacado }),
    },
  });
  return NextResponse.json(coche);
}

// DELETE: eliminar
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  await prisma.coche.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
