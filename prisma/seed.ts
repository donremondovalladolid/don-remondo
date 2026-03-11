import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const coches = [
  {
    slug: "ford-focus-2019-titanium",
    marca: "Ford",
    modelo: "Focus Titanium 1.5 EcoBoost",
    anio: 2019,
    km: 62000,
    precio: 14900,
    combustible: "Gasolina",
    cambio: "Manual",
    color: "Blanco",
    puertas: 5,
    descripcion:
      "Ford Focus en excelente estado. Un solo propietario, mantenimiento al día en taller oficial. Equipado con navegación, sensores de aparcamiento, cámara trasera y climatizador automático. Revisado y con garantía de 12 meses.",
    fotos: JSON.stringify([
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    ]),
    vendido: false,
    destacado: true,
  },
  {
    slug: "seat-leon-2020-fr",
    marca: "SEAT",
    modelo: "León FR 1.5 TSI 150CV",
    anio: 2020,
    km: 45000,
    precio: 18500,
    combustible: "Gasolina",
    cambio: "Manual",
    color: "Negro",
    puertas: 5,
    descripcion:
      "SEAT León FR impecable. Acabado deportivo con llantas de 18\", faros Full LED, pantalla táctil de 10\" con Apple CarPlay/Android Auto. Historial de mantenimiento completo. Garantía 12 meses incluida.",
    fotos: JSON.stringify([
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    ]),
    vendido: false,
    destacado: true,
  },
  {
    slug: "volkswagen-golf-2018-highline",
    marca: "Volkswagen",
    modelo: "Golf Highline 2.0 TDI 150CV",
    anio: 2018,
    km: 88000,
    precio: 16200,
    combustible: "Diésel",
    cambio: "Manual",
    color: "Gris Plata",
    puertas: 5,
    descripcion:
      "VW Golf Highline con motor 2.0 TDI de bajo consumo. Equipamiento completo: Discover Pro, sensores delanteros y traseros, asientos de cuero, techo panorámico. Revisiones en concesionario VW. Libre de cargas.",
    fotos: JSON.stringify([
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    ]),
    vendido: false,
    destacado: false,
  },
  {
    slug: "renault-clio-2021-intens",
    marca: "Renault",
    modelo: "Clio Intens 1.0 TCe 100CV",
    anio: 2021,
    km: 28000,
    precio: 15800,
    combustible: "Gasolina",
    cambio: "Manual",
    color: "Rojo",
    puertas: 5,
    descripcion:
      "Renault Clio de quinta generación casi nuevo. Pantalla Easy Link de 9.3\", carga inalámbrica, Easy Park Assist, cámara 360°. Ideal para ciudad. Primer propietario, sin golpes ni arañazos.",
    fotos: JSON.stringify([
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
    ]),
    vendido: false,
    destacado: true,
  },
  {
    slug: "toyota-corolla-2020-active",
    marca: "Toyota",
    modelo: "Corolla Active Tech 1.8 Hybrid",
    anio: 2020,
    km: 51000,
    precio: 21500,
    combustible: "Híbrido",
    cambio: "Automático",
    color: "Blanco Perla",
    puertas: 4,
    descripcion:
      "Toyota Corolla Híbrido con consumo medio de 4.5L/100km. Automático de doble motor. Equipado con Toyota Safety Sense, control de crucero adaptativo, Toyota Touch 2 con Go. Perfecto para quien busca ahorro.",
    fotos: JSON.stringify([
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
    ]),
    vendido: false,
    destacado: false,
  },
  {
    slug: "peugeot-2008-2019-allure",
    marca: "Peugeot",
    modelo: "2008 Allure 1.2 PureTech 130CV",
    anio: 2019,
    km: 74000,
    precio: 13900,
    combustible: "Gasolina",
    cambio: "Automático",
    color: "Azul",
    puertas: 5,
    descripcion:
      "Peugeot 2008 SUV con cambio automático EAT6. Grip Control para terrenos difíciles, freno de estacionamiento eléctrico, Park Assist. Revisado antes de la venta con cambio de aceite y filtros. Garantía 6 meses.",
    fotos: JSON.stringify([
      "https://images.unsplash.com/photo-1617469767946-2e9a8a97c23a?w=800&q=80",
    ]),
    vendido: true,
    destacado: false,
  },
];

async function main() {
  console.log("Sembrando base de datos con coches de demostración...");

  for (const coche of coches) {
    await prisma.coche.upsert({
      where: { slug: coche.slug },
      update: {},
      create: coche,
    });
    console.log(`  ✓ ${coche.marca} ${coche.modelo} (${coche.anio})`);
  }

  console.log(`\n✅ ${coches.length} coches insertados correctamente.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
