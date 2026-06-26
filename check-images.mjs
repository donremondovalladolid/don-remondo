import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const images = await prisma.configStore.findMany({ where: { type: "image" } });
console.log(images);
