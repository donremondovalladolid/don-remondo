export const SITE_CONFIG = {
  name: "Don Remondo",
  tagline: "Productos frescos y Taller Mecánico en Valladolid",
  phone: "676 981 870",
  phoneRaw: "676981870",
  email: "info@donremondo.es",
  url: "https://donremondo.es",
  founded: 2016,
  experience: 7,
};

export const ESPARRAGOS_CONFIG = {
  name: "Don Remondo — Productos Valladolid",
  address: "Av. del Euro, 24, 47009 Valladolid",
  addressShort: "Av. del Euro, 24",
  city: "Valladolid",
  cp: "47009",
  phone: "676 981 870",
  phoneRaw: "676981870",
  email: "donremondocalle@hotmail.com",
  horario: "Todos los días: 05:00 – 10:00",
  horarioLineas: ["Todos los días: 05:00 – 10:00"],
  temporada: "Final de marzo – mediados de junio",
  lat: 41.6388,
  lng: -4.7209,
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-4.7209!3d41.6388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.+del+Euro+24+Valladolid!5e0!3m2!1ses!2ses!4v1",
  mapsUrl: "https://maps.google.com/?q=Av.+del+Euro,+24,+47009+Valladolid",
};

export const ESPARRAGOS_REMONDO_CONFIG = {
  name: "Don Remondo — Espárragos Remondo",
  address: "C. Calvario, 8, 40216 Remondo, Segovia",
  addressShort: "C. Calvario, 8",
  city: "Remondo",
  province: "Segovia",
  cp: "40216",
  phone: "676 981 870",
  phoneRaw: "676981870",
  email: "donremondocalle@hotmail.com",
  horario: "Todos los días: 15:00 – 19:30",
  horarioLineas: ["Todos los días: 15:00 – 19:30"],
  temporada: "Final de marzo – mediados de junio",
  lat: 41.2833,
  lng: -4.4167,
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-4.4167!3d41.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sC.+Calvario+8+Remondo+Segovia!5e0!3m2!1ses!2ses!4v1",
  mapsUrl: "https://maps.google.com/?q=C.+Calvario,+8,+40216+Remondo,+Segovia",
};

export const ESPARRAGOS_ENVIOS = {
  dias: ["Lunes", "Martes", "Miércoles"],
  nota: "Realizamos envíos de espárragos los lunes, martes y miércoles.",
};

/** Categorías del espárrago blanco */
export const ESPARRAGOS_BLANCO_CATEGORIAS = [
  {
    nombre: "Extra",
    colorEtiqueta: "roja",
    colorHex: "#e03030",
    colorBg: "#fef2f2",
    pack: "Packs de 10–12 espárragos",
    descripcion: "La categoría más selecta. Espárragos gruesos y uniformes.",
    imagen: "/images/esparragos/blanco-extra.png",
  },
  {
    nombre: "Primera",
    colorEtiqueta: "verde",
    colorHex: "#2d7028",
    colorBg: "#f0faf0",
    pack: "Packs de 12–17 espárragos",
    descripcion: "Excelente calibre y presentación. La elección más popular.",
    imagen: "/images/esparragos/blanco-primera.png",
  },
  {
    nombre: "Segunda",
    colorEtiqueta: "amarilla",
    colorHex: "#b08000",
    colorBg: "#fefce8",
    pack: "Packs de 12–19 espárragos",
    descripcion: "Mismo sabor de producción propia. Calibre más variado.",
    imagen: "/images/esparragos/blanco-segunda.png",
  },
  {
    nombre: "Tercera",
    colorEtiqueta: "blanca",
    colorHex: "#6b7280",
    colorBg: "#f9fafb",
    pack: "Espárragos finos",
    descripcion: "Espárragos finos. Ideales para revueltos y guarniciones.",
    imagen: "/images/esparragos/blanco-tercera.png",
  },
] as const;

/** Variedades de espárrago triguero */
export const ESPARRAGOS_TRIGUERO_VARIEDADES = [
  {
    nombre: "Finos",
    formato: "Mazos de 300g",
    descripcion: "Más delicados, perfectos para la plancha o el wok.",
    imagen: "/images/esparragos/trigueros-fino.png",
  },
  {
    nombre: "Gruesos",
    formato: "Mazos de 300g",
    descripcion: "Más carnosos. Ideales para la brasa o al horno.",
    imagen: "/images/esparragos/trigueros-grueso.png",
  },
] as const;

/** Productos disponibles todo el año — tienda de Valladolid */
export const PRODUCTOS_TODO_EL_ANO = [
  {
    nombre: "Patata",
    descripcion: "Variedad Voyager, nuestra especialidad. Piel fina, textura mantecosa y sabor excepcional.",
    variedadDestacada: "Variedad Voyager",
    produccionPropia: true,
    imagen: "/images/productos/patata.jpeg",
  },
  {
    nombre: "Puerro",
    descripcion: "De producción propia en la zona. Tiernos, con el punto justo de intensidad.",
    produccionPropia: true,
    imagen: "/images/productos/puerro.jpeg",
  },
  {
    nombre: "Zanahoria",
    descripcion: "Producción propia en la zona. Dulces y crujientes, perfectas en crudo o cocinadas.",
    produccionPropia: true,
    imagen: "/images/productos/zanahoria.jpeg",
  },
  {
    nombre: "Pimiento",
    descripcion: "Rojos y verdes en dos variedades: Italiano (más dulce y alargado) y California (carnoso y redondo).",
    variedades: ["Italiano", "California"],
    imagen: "/images/productos/pimiento.jpg",
  },
  {
    nombre: "Berenjena",
    descripcion: "Piel brillante y pulpa firme. Perfecta para asar, freír o hacer al horno.",
    imagen: "/images/productos/berenjena.jpg",
  },
  {
    nombre: "Pepino",
    descripcion: "Frescos y crujientes. De piel fina, ideales para ensaladas y gazpacho.",
    imagen: "/images/productos/pepino.jpeg",
  },
  {
    nombre: "Calabacín",
    descripcion: "Tiernos y versátiles. En temporada punta, también los tenemos de producción propia.",
    imagen: "/images/productos/calabacin.jpg",
  },
  {
    nombre: "Manzana",
    descripcion: "Cuatro variedades según la temporada: Golden, Fuji, Royal Gala y Reineta.",
    variedades: ["Golden", "Fuji", "Royal Gala", "Reineta"],
    imagen: "/images/productos/manzana.jpg",
  },
  {
    nombre: "Tomate",
    descripcion: "Gran variedad: RAF (con la subvariedad Delicius como estrella), Pera, Roja, Azul, Daniela y Asurcado.",
    variedades: ["RAF Delicius", "Pera", "Roja", "Azul", "Daniela", "Asurcado"],
    variedadDestacada: "RAF Delicius",
    imagen: "/images/productos/tomate.jpg",
  },
] as const;

/** Productos de temporada (excluidos espárragos, que tienen su propia sección) */
export const PRODUCTOS_TEMPORADA = [
  {
    nombre: "Repollo",
    descripcion: "Producción propia en la zona. Hojas prietas y sabor intenso.",
    temporada: "Septiembre – Diciembre",
    produccionPropia: true,
    imagen: "/images/productos/repollo.jpg",
  },
  {
    nombre: "Lombarda",
    descripcion: "Producción propia. Color morado intenso, rica en antioxidantes.",
    temporada: "Septiembre – Diciembre",
    produccionPropia: true,
    imagen: "/images/productos/lombarda.jpg",
  },
  {
    nombre: "Coliflor",
    descripcion: "Producción propia en la zona. Blanca, compacta y de sabor suave.",
    temporada: "Septiembre – Diciembre",
    produccionPropia: true,
    imagen: "/images/productos/coliflor.jpg",
  },
  {
    nombre: "Brócoli",
    descripcion: "Producción propia. Racimos prietos, verde intenso y máxima frescura.",
    temporada: "Septiembre – Diciembre",
    produccionPropia: true,
    imagen: "/images/productos/brocoli.jpeg",
  },
  {
    nombre: "Romanesca",
    descripcion: "Producción propia. La variante más vistosa de la coliflor, con su característica espiral.",
    temporada: "Septiembre – Diciembre",
    produccionPropia: true,
    imagen: "/images/productos/romanesca.jpg",
  },
  {
    nombre: "Cardo",
    descripcion: "Producción propia. Un clásico castellano de invierno, solo disponible unas semanas.",
    temporada: "Diciembre – Febrero",
    produccionPropia: true,
    imagen: "/images/productos/cardo.jpeg",
  },
  {
    nombre: "Naranja",
    descripcion: "Marca NANNI con hojas. La referencia en calidad: zumo abundante, dulzor equilibrado y piel aromática.",
    temporada: "Diciembre – Febrero",
    marcaDestacada: "NANNI con hojas",
    imagen: "/images/productos/naranja.jpg",
  },
] as const;

export const IMAGES = {
  home: {
    productosCard: "/images/esparragos/blanco-extra.png",
    tallerCard: "/fotos/interior_taller_1.jpeg",
    familia: "/images/home/familia.svg",
  },
  esparragos: {
    hero: "/images/esparragos/campo.jpeg",
    blancoExtra: "/images/esparragos/blanco-extra.png",
    blancoPrimera: "/images/esparragos/blanco-primera.png",
    blancoSegunda: "/images/esparragos/blanco-segunda.png",
    blancoTercera: "/images/esparragos/blanco-tercera.png",
    trigueroFino: "/images/esparragos/trigueros-fino.png",
    trigueroGrueso: "/images/esparragos/trigueros-grueso.png",
    /** fallback SVG para categorías sin foto propia */
    blanco: "/images/productos/esparragos-blanco.svg",
    triguero: "/images/productos/esparragos-triguero.svg",
    origen: "/images/esparragos/campo.jpeg",
  },
  productos: {
    patata: "/images/productos/patata.jpeg",
    puerro: "/images/productos/puerro.jpeg",
    zanahoria: "/images/productos/zanahoria.jpeg",
    pimiento: "/images/productos/pimiento.jpg",
    berenjena: "/images/productos/berenjena.jpg",
    pepino: "/images/productos/pepino.jpeg",
    calabacin: "/images/productos/calabacin.jpg",
    manzana: "/images/productos/manzana.jpg",
    tomate: "/images/productos/tomate.jpg",
    repollo: "/images/productos/repollo.jpg",
    lombarda: "/images/productos/lombarda.jpg",
    coliflor: "/images/productos/coliflor.jpg",
    brocoli: "/images/productos/brocoli.jpeg",
    romanesca: "/images/productos/romanesca.jpg",
    cardo: "/images/productos/cardo.jpeg",
    naranja: "/images/productos/naranja.jpg",
  },
  taller: {
    hero: "/fotos/equipo_taller.jpeg",
    interior: "/fotos/interior_taller_1.jpeg",
    interior2: "/fotos/interior_taller_2.jpeg",
    interior3: "/fotos/interior_taller_3.jpeg",
    equipo: "/fotos/equipo_taller.jpeg",
  },
  tiendas: {
    valladolid: "/images/tiendas/mercaolid.jpeg",
    remondo: "/images/tiendas/remondo.svg",
  },
} as const;

export const TALLER_CONFIG = {
  name: "Don Remondo — Taller y Coches",
  address: "C. Villacarralón, 14, 47008 Valladolid",
  addressShort: "C. Villacarralón, 14",
  city: "Valladolid",
  cp: "47008",
  phone: "676 981 870",
  phoneRaw: "676981870",
  email: "cochesremondo@gmail.com",
  email2: "remondocoches@hotmail.com",
  horario: "Lunes a Viernes: 09:00 – 13:00 / 16:00 – 20:00",
  horarioLineas: ["Lun – Vie: 09:00 – 13:00", "Lun – Vie: 16:00 – 20:00"],
  lat: 41.6421,
  lng: -4.7318,
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-4.7318!3d41.6421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sC.+Villacarralo%CC%81n+14+Valladolid!5e0!3m2!1ses!2ses!4v1",
  mapsUrl:
    "https://maps.google.com/?q=C.+Villacarralón,+14,+47008+Valladolid",
};
