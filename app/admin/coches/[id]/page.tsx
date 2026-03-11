import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CocheForm from "@/components/admin/CocheForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditCochePage({ params }: Props) {
  const { id } = await params;
  const coche = await prisma.coche.findUnique({ where: { id: Number(id) } });
  if (!coche) notFound();

  const fotos = JSON.parse(coche.fotos) as string[];

  return (
    <CocheForm
      initialData={{
        id: coche.id,
        marca: coche.marca,
        modelo: coche.modelo,
        anio: String(coche.anio),
        km: String(coche.km),
        precio: String(coche.precio),
        combustible: coche.combustible,
        cambio: coche.cambio,
        color: coche.color,
        puertas: String(coche.puertas),
        descripcion: coche.descripcion,
        fotos,
        vendido: coche.vendido,
        destacado: coche.destacado,
      }}
    />
  );
}
