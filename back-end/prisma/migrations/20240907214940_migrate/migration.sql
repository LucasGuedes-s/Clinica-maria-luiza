/*
  Warnings:

  - The `foto` column on the `AvaliacaoAba` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Agendamentos" DROP CONSTRAINT "Agendamentos_pacienteId_fkey";

-- AlterTable
ALTER TABLE "AvaliacaoAba" DROP COLUMN "foto",
ADD COLUMN     "foto" VARCHAR(2048)[];

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;
