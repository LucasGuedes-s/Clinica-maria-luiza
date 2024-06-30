-- CreateTable
CREATE TABLE `Profissionais` (
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `foto` VARCHAR(2048) NULL,
    `identificador` VARCHAR(191) NULL,
    `pix` VARCHAR(191) NULL,
    `permissaoId` INTEGER NOT NULL,
    `especialidadeId` INTEGER NULL,

    UNIQUE INDEX `Profissionais_identificador_key`(`identificador`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pacientes` (
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nome_mae` VARCHAR(191) NULL,
    `data_nascimento` DATETIME(3) NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NULL,
    `foto` VARCHAR(2048) NULL,

    UNIQUE INDEX `Pacientes_email_key`(`email`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agendamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `agendamento` VARCHAR(191) NULL,
    `notas` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `pacienteId` VARCHAR(191) NULL,
    `sala` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notas` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consulta` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descricao` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(2048) NULL,
    `pacienteId` VARCHAR(191) NULL,
    `profissionalId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagamentos` (
    `id` INTEGER NOT NULL,
    `pagamento` DOUBLE NULL,
    `paciente` VARCHAR(191) NULL,
    `profissionalId` VARCHAR(191) NULL,
    `Data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nivel` INTEGER NOT NULL,
    `acesso` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Especialidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Especialidade` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profissionais` ADD CONSTRAINT `Profissionais_permissaoId_fkey` FOREIGN KEY (`permissaoId`) REFERENCES `Permissao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profissionais` ADD CONSTRAINT `Profissionais_especialidadeId_fkey` FOREIGN KEY (`especialidadeId`) REFERENCES `Especialidade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamentos` ADD CONSTRAINT `Agendamentos_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Pacientes`(`cpf`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamentos` ADD CONSTRAINT `Agendamentos_sala_fkey` FOREIGN KEY (`sala`) REFERENCES `Salas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultas` ADD CONSTRAINT `Consultas_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Pacientes`(`cpf`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultas` ADD CONSTRAINT `Consultas_profissionalId_fkey` FOREIGN KEY (`profissionalId`) REFERENCES `Profissionais`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagamentos` ADD CONSTRAINT `Pagamentos_profissionalId_fkey` FOREIGN KEY (`profissionalId`) REFERENCES `Profissionais`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
