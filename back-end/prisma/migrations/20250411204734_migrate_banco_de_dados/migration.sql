-- DropIndex
DROP INDEX "Pacientes_email_key";

-- AlterTable
ALTER TABLE "Agendamentos" ADD COLUMN     "dias_notificacao" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "notificacao_recorrente" BOOLEAN DEFAULT false,
ADD COLUMN     "ultima_notificacao" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ConsultaAba" ADD COLUMN     "comportamentos" TEXT;

-- AlterTable
ALTER TABLE "Pacientes" ADD COLUMN     "status" TEXT DEFAULT 'Ativo';

-- AlterTable
ALTER TABLE "Profissionais" ADD COLUMN     "status" TEXT DEFAULT 'Ativo';

-- CreateTable
CREATE TABLE "Estimulos" (
    "id" SERIAL NOT NULL,
    "nome_estimulo" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Estimulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PacienteEstimulo" (
    "pacienteCpf" TEXT NOT NULL,
    "estimuloId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalizadoEm" TIMESTAMP(3),

    CONSTRAINT "PacienteEstimulo_pkey" PRIMARY KEY ("pacienteCpf","estimuloId")
);

-- AddForeignKey
ALTER TABLE "PacienteEstimulo" ADD CONSTRAINT "PacienteEstimulo_pacienteCpf_fkey" FOREIGN KEY ("pacienteCpf") REFERENCES "Pacientes"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacienteEstimulo" ADD CONSTRAINT "PacienteEstimulo_estimuloId_fkey" FOREIGN KEY ("estimuloId") REFERENCES "Estimulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
