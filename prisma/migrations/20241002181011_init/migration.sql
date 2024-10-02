/*
  Warnings:

  - You are about to drop the column `Ano` on the `FilmesLista` table. All the data in the column will be lost.
  - You are about to drop the column `Diretor` on the `FilmesLista` table. All the data in the column will be lost.
  - You are about to drop the column `IdGenero` on the `FilmesLista` table. All the data in the column will be lost.
  - You are about to drop the column `Lancamento` on the `FilmesLista` table. All the data in the column will be lost.
  - You are about to drop the column `Titulo` on the `FilmesLista` table. All the data in the column will be lost.
  - The primary key for the `Genero` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Genero` on the `Genero` table. All the data in the column will be lost.
  - You are about to drop the column `idGenero` on the `Genero` table. All the data in the column will be lost.
  - Added the required column `ano` to the `FilmesLista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diretor` to the `FilmesLista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idGenero` to the `FilmesLista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lancamento` to the `FilmesLista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `FilmesLista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fenero` to the `Genero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FilmesLista" DROP COLUMN "Ano",
DROP COLUMN "Diretor",
DROP COLUMN "IdGenero",
DROP COLUMN "Lancamento",
DROP COLUMN "Titulo",
ADD COLUMN     "ano" TEXT NOT NULL,
ADD COLUMN     "diretor" TEXT NOT NULL,
ADD COLUMN     "idGenero" INTEGER NOT NULL,
ADD COLUMN     "lancamento" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Genero" DROP CONSTRAINT "Genero_pkey",
DROP COLUMN "Genero",
DROP COLUMN "idGenero",
ADD COLUMN     "fenero" TEXT NOT NULL,
ADD COLUMN     "id_genero" SERIAL NOT NULL,
ADD CONSTRAINT "Genero_pkey" PRIMARY KEY ("id_genero");
