-- CreateTable
CREATE TABLE "Coche" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "km" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "combustible" TEXT NOT NULL,
    "cambio" TEXT NOT NULL DEFAULT 'Manual',
    "color" TEXT NOT NULL DEFAULT '',
    "puertas" INTEGER NOT NULL DEFAULT 5,
    "descripcion" TEXT NOT NULL DEFAULT '',
    "fotos" TEXT NOT NULL DEFAULT '[]',
    "vendido" BOOLEAN NOT NULL DEFAULT false,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Coche_slug_key" ON "Coche"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
