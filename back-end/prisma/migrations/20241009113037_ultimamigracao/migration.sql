/*
  Warnings:

  - A unique constraint covering the columns `[pacienteId]` on the table `Pacientes_dados` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_dados_pacienteId_key" ON "Pacientes_dados"("pacienteId");
