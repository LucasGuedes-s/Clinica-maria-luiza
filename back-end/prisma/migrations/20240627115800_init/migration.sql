-- CreateTable
CREATE TABLE `Profissionais` (
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `foto` VARCHAR(2048) NULL,
    `identificador` VARCHAR(191) NULL,
    `permissaoId` INTEGER NOT NULL,
    `funcaoId` INTEGER NULL,

    UNIQUE INDEX `Profissionais_identificador_key`(`identificador`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nivel` INTEGER NOT NULL,
    `acesso` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `funcao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profissionais` ADD CONSTRAINT `Profissionais_permissaoId_fkey` FOREIGN KEY (`permissaoId`) REFERENCES `Permissao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profissionais` ADD CONSTRAINT `Profissionais_funcaoId_fkey` FOREIGN KEY (`funcaoId`) REFERENCES `Funcao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
