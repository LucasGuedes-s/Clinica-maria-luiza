/*
  Warnings:

  - You are about to drop the column `movimentacao` on the `Pagamentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pacientes" ADD COLUMN     "laudos" VARCHAR(2048)[];

-- AlterTable
ALTER TABLE "Pacientes_dados" ADD COLUMN     "laudos" VARCHAR(2048)[];

-- AlterTable
ALTER TABLE "Pagamentos" DROP COLUMN "movimentacao";
