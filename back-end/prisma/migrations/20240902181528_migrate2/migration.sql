/*
  Warnings:

  - You are about to drop the column `data_aplicacao` on the `ConsultaAba` table. All the data in the column will be lost.
  - You are about to drop the column `nome_aplicador` on the `ConsultaAba` table. All the data in the column will be lost.
  - You are about to drop the column `especialidadeId` on the `Profissionais` table. All the data in the column will be lost.
  - You are about to drop the `Especialidade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Agendamentos" DROP CONSTRAINT "Agendamentos_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "Profissionais" DROP CONSTRAINT "Profissionais_especialidadeId_fkey";

-- AlterTable
ALTER TABLE "ConsultaAba" DROP COLUMN "data_aplicacao",
DROP COLUMN "nome_aplicador",
ADD COLUMN     "data" TIMESTAMP(3),
ADD COLUMN     "foto" VARCHAR(2048),
ADD COLUMN     "hora_fim" TIMESTAMP(3),
ADD COLUMN     "hora_inicio" TIMESTAMP(3),
ADD COLUMN     "profissionalId" TEXT;

-- AlterTable
ALTER TABLE "Consultas" ADD COLUMN     "hora_fim" TIMESTAMP(3),
ADD COLUMN     "hora_inicio" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Profissionais" DROP COLUMN "especialidadeId",
ADD COLUMN     "especialidade" TEXT;

-- DropTable
DROP TABLE "Especialidade";

-- CreateTable
CREATE TABLE "AvaliacaoAba" (
    "pacientes" SERIAL NOT NULL,
    "pacienteId" TEXT,
    "foto" VARCHAR(2048),

    CONSTRAINT "AvaliacaoAba_pkey" PRIMARY KEY ("pacientes")
);

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultaAba" ADD CONSTRAINT "ConsultaAba_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissionais"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoAba" ADD CONSTRAINT "AvaliacaoAba_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;
