-- CreateTable
CREATE TABLE "Profissionais" (
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "foto" VARCHAR(2048),
    "identificador" TEXT,
    "pix" TEXT,
    "permissaoId" INTEGER NOT NULL,
    "especialidadeId" INTEGER,

    CONSTRAINT "Profissionais_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Pacientes" (
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "nome" TEXT NOT NULL,
    "nome_mae" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "telefone" TEXT NOT NULL,
    "endereco" TEXT,
    "foto" VARCHAR(2048),

    CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Agendamentos" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "agendamento" TEXT,
    "notas" TEXT,
    "status" TEXT,
    "pacienteId" TEXT,
    "sala" INTEGER,

    CONSTRAINT "Agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salas" (
    "id" SERIAL NOT NULL,
    "notas" TEXT,

    CONSTRAINT "Salas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultas" (
    "id" SERIAL NOT NULL,
    "consulta" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT NOT NULL,
    "foto" VARCHAR(2048),
    "pacienteId" TEXT,
    "profissionalId" TEXT,

    CONSTRAINT "Consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamentos" (
    "id" INTEGER NOT NULL,
    "pagamento" DOUBLE PRECISION,
    "paciente" TEXT,
    "profissionalId" TEXT,
    "Data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissao" (
    "id" SERIAL NOT NULL,
    "acesso" TEXT,

    CONSTRAINT "Permissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialidade" (
    "id" SERIAL NOT NULL,
    "Especialidade" TEXT,

    CONSTRAINT "Especialidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profissionais_identificador_key" ON "Profissionais"("identificador");

-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_email_key" ON "Pacientes"("email");

-- AddForeignKey
ALTER TABLE "Profissionais" ADD CONSTRAINT "Profissionais_permissaoId_fkey" FOREIGN KEY ("permissaoId") REFERENCES "Permissao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profissionais" ADD CONSTRAINT "Profissionais_especialidadeId_fkey" FOREIGN KEY ("especialidadeId") REFERENCES "Especialidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_sala_fkey" FOREIGN KEY ("sala") REFERENCES "Salas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultas" ADD CONSTRAINT "Consultas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Pacientes"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultas" ADD CONSTRAINT "Consultas_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissionais"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamentos" ADD CONSTRAINT "Pagamentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissionais"("email") ON DELETE SET NULL ON UPDATE CASCADE;
