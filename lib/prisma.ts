import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  let url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // En Vercel (Serverless) las conexiones WebSocket (libsql://) fallan a menudo.
  // Turso recomienda forzar HTTP (https://) en entornos Serverless.
  if (url && url.startsWith("libsql://")) {
    url = url.replace("libsql://", "https://");
  }

  // Si estamos en producción o tenemos configurado Turso, usamos el adaptador
  if (url && url.startsWith("https://") && authToken) {
    const libsql = createClient({
      url,
      authToken,
    });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter });
  }

  // Fallback a base de datos local
  const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
  return new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
