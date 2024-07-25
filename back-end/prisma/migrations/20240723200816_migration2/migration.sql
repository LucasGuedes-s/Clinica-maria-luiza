/*
  Warnings:

  - The `foto` column on the `Consultas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `profissionalId` to the `Agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamentos" ADD COLUMN     "data_conclusao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profissionalId" TEXT NOT NULL,
ALTER COLUMN "data" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Consultas" ADD COLUMN     "laudos" VARCHAR(2048)[],
ALTER COLUMN "descricao" DROP NOT NULL,
DROP COLUMN "foto",
ADD COLUMN     "foto" VARCHAR(2048)[];

-- CreateTable
CREATE TABLE "PacientesABA_dados" (
    "paciente" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION,
    "altura" DOUBLE PRECISION,
    "comestiveis" VARCHAR(2048),
    "tangiveis" VARCHAR(2048),
    "fisicos" VARCHAR(2048),
    "data_aplicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT,

    CONSTRAINT "PacientesABA_dados_pkey" PRIMARY KEY ("paciente")
);

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissionais"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
