import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const url = "libsql://don-remondo-donremondo.aws-eu-west-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODI0NTg4NjIsImlkIjoiMDE5ZjAyZDMtN2QwMS03OWU3LWI1Y2YtMTkyMjdjODNkNzkwIiwicmlkIjoiYjRjZWM5ZTYtZjQ4MC00YjRkLWEwYzEtMTNjMDBlYWJlZjg1In0.QDnbF3G2od893tp9MUQz1DoQ2sWiase_e7Jdv0eMum7WeucZz-P5Bgf78qyvZyH8oXcBZx7whHaMzzGL137aAg";

const libsql = createClient({ url, authToken });
const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Querying coches with libsql://...");
  const coches = await prisma.coche.findMany();
  console.log("Coches:", coches.length);
}
main().catch(console.error);
