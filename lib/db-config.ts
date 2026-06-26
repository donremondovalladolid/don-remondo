import { prisma } from "./prisma";
import { TALLER_CONFIG, ESPARRAGOS_CONFIG, IMAGES, PRODUCTOS_TODO_EL_ANO, PRODUCTOS_TEMPORADA, ESPARRAGOS_BLANCO_CATEGORIAS, ESPARRAGOS_TRIGUERO_VARIEDADES } from "./config";

// Recursive function to update object with overrides based on paths
function applyOverrides(base: any, path: string, value: string) {
  const parts = path.split(".");
  let current = base;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  const lastKey = parts[parts.length - 1];
  current[lastKey] = value;
}

export async function getDynamicImages() {
  const overrides = await prisma.configStore.findMany({
    where: { type: "image" },
  });

  // Deep clone to avoid mutating the original config across requests
  const dynamicImages = JSON.parse(JSON.stringify(IMAGES));

  for (const override of overrides) {
    applyOverrides(dynamicImages, override.key, override.value);
  }

  // Sincronizar imágenes redundantes para evitar configuración duplicada en admin
  dynamicImages.esparragos.trigueroGrueso = dynamicImages.esparragos.trigueroFino;
  dynamicImages.esparragos.envasados = dynamicImages.esparragos.blancoSegunda;

  return dynamicImages;
}

export async function getDynamicSchedules() {
  const overrides = await prisma.configStore.findMany({
    where: { type: "schedule" },
  });

  const dynamicSchedules: Record<string, string[]> = {
    taller: [...TALLER_CONFIG.horarioLineas],
    esparragos_valladolid: [...ESPARRAGOS_CONFIG.horarioLineas],
  };

  for (const override of overrides) {
    try {
      const parsed = JSON.parse(override.value);
      if (Array.isArray(parsed) && dynamicSchedules[override.key]) {
        dynamicSchedules[override.key] = parsed;
      }
    } catch (e) {
      console.error(`Failed to parse schedule override for ${override.key}`);
    }
  }

  return dynamicSchedules;
}

export async function getDynamicProductArrays() {
  const overrides = await prisma.configStore.findMany({
    where: { type: "image" },
  });

  const configMap = new Map(overrides.map(o => [o.key, o.value]));

  const mapProducts = (products: any[], category: string) => {
    return products.map(p => {
      // Find matching key in IMAGES.productos or IMAGES.esparragos
      const key = p.nombre.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/\s+/g, ''); // simplify name for key matching (e.g. "blancoExtra")
      
      let matchedKey = "";
      if (category === "productos") {
        matchedKey = `productos.${key}`;
      } else if (category.startsWith("esparragos")) {
        // e.g. "blancoExtra"
        matchedKey = `esparragos.${category.split('.')[1]}${p.nombre.replace(/\s+/g, '')}`;
      }

      const overrideUrl = configMap.get(matchedKey);
      return { ...p, imagen: overrideUrl || p.imagen, visible: true };
    });
  };

  const productVisibilityOverrides = await prisma.configStore.findMany({
    where: { type: "product_visibility" }
  });
  const visibilityMap = new Map(productVisibilityOverrides.map(o => [o.key, o.value === "true"]));

  const applyVisibility = (products: any[]) => {
    return products.map(p => {
      const key = p.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
      const visible = visibilityMap.has(key) ? visibilityMap.get(key) : true;
      return { ...p, visible };
    });
  };

  return {
    todoElAno: applyVisibility(mapProducts([...PRODUCTOS_TODO_EL_ANO], "productos")),
    temporada: applyVisibility(mapProducts([...PRODUCTOS_TEMPORADA], "productos")),
    blancoCategorias: applyVisibility(mapProducts([...ESPARRAGOS_BLANCO_CATEGORIAS], "esparragos.blanco")), // This is complex, better to use IMAGES mapping.
    trigueroVariedades: applyVisibility(mapProducts([...ESPARRAGOS_TRIGUERO_VARIEDADES], "esparragos.triguero")),
  };
}

export async function getDynamicContacts() {
  const overrides = await prisma.configStore.findMany({
    where: { type: "contact" },
  });

  const dynamicEsparragos = JSON.parse(JSON.stringify(ESPARRAGOS_CONFIG));
  const dynamicTaller = JSON.parse(JSON.stringify(TALLER_CONFIG));

  for (const override of overrides) {
    if (override.key.startsWith("esparragos.")) {
      applyOverrides(dynamicEsparragos, override.key.replace("esparragos.", ""), override.value);
    } else if (override.key.startsWith("taller.")) {
      applyOverrides(dynamicTaller, override.key.replace("taller.", ""), override.value);
    }
  }

  return { esparragos: dynamicEsparragos, taller: dynamicTaller };
}
