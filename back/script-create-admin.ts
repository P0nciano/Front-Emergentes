// script-create-admin.ts
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "Super@admin.com";   // troque se quiser
  const plainPassword = "@Senha123";    // senha em texto simples
  const nome = "Admin";
  const nivel = 3;                   // ajuste conforme seu model (use o número correspondente ao nível desejado)

  // checa se já existe e faz upsert (cria se não existir, atualiza se existir)
  const hashed = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.admin.upsert({
    // where: { email }, // Use this only if 'email' is unique in your Prisma schema
    where: { id: "admin-id" }, // Replace "admin-id" with the actual admin id you want to upsert
    update: {
      nome,
      senha: hashed,
      nivel
    },
    create: {
      nome,
      email,
      senha: hashed,
      nivel
    },
  });

  console.log("✅ Admin criado/atualizado:", {
    id: admin.id,
    nome: admin.nome,
    email: admin.email,
    nivel: admin.nivel
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
