/*
  Warnings:

  - You are about to drop the column `idGenero` on the `filmeslista` table. All the data in the column will be lost.
  - You are about to drop the column `fenero` on the `genero` table. All the data in the column will be lost.
  - Added the required column `genero` to the `genero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "filmeslista" DROP COLUMN "idGenero",
ADD COLUMN     "idgenero" INTEGER,
ALTER COLUMN "ano" DROP NOT NULL,
ALTER COLUMN "lancamento" DROP NOT NULL,
ALTER COLUMN "diretor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "genero" DROP COLUMN "fenero",
ADD COLUMN     "genero" TEXT NOT NULL;
