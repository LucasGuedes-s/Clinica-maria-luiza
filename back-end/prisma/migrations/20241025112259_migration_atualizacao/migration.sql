/*
  Warnings:

  - The `data` column on the `ConsultaAba` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ConsultaAba" DROP COLUMN "data",
ADD COLUMN     "data" TIMESTAMP(3);
