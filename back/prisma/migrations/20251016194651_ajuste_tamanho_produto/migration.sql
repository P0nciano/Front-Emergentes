/*
  Warnings:

  - You are about to alter the column `foto` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "public"."produtos" ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "foto" SET DATA TYPE VARCHAR(500);
