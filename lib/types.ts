export type Coche = {
  id: number;
  slug: string;
  marca: string;
  modelo: string;
  anio: number;
  km: number;
  precio: number;
  combustible: string;
  cambio: string;
  color: string;
  puertas: number;
  descripcion: string;
  fotos: string;
  vendido: boolean;
  destacado: boolean;
  createdAt: Date;
  updatedAt: Date;
};