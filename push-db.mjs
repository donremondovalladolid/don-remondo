import { createClient } from "@libsql/client";
import { readFileSync } from "fs";

const client = createClient({
  url: "libsql://don-remondo-donremondo.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODI0NTg4NjIsImlkIjoiMDE5ZjAyZDMtN2QwMS03OWU3LWI1Y2YtMTkyMjdjODNkNzkwIiwicmlkIjoiYjRjZWM5ZTYtZjQ4MC00YjRkLWEwYzEtMTNjMDBlYWJlZjg1In0.QDnbF3G2od893tp9MUQz1DoQ2sWiase_e7Jdv0eMum7WeucZz-P5Bgf78qyvZyH8oXcBZx7whHaMzzGL137aAg"
});

const sql = readFileSync("setup.sql", "utf-8");

async function main() {
  console.log("Pushing schema to Turso...");
  try {
    await client.executeMultiple(sql);
    console.log("Success! Database schema created.");
  } catch (e) {
    console.error(e);
  }
}
main();
