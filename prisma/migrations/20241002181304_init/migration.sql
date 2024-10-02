/*
  Warnings:

  - You are about to drop the `FilmesLista` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FilmesLista";

-- DropTable
DROP TABLE "Genero";

-- CreateTable
CREATE TABLE "genero" (
    "id_genero" SERIAL NOT NULL,
    "fenero" TEXT NOT NULL,

    CONSTRAINT "genero_pkey" PRIMARY KEY ("id_genero")
);

-- CreateTable
CREATE TABLE "filmeslista" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "lancamento" TEXT NOT NULL,
    "idGenero" INTEGER NOT NULL,
    "diretor" TEXT NOT NULL,

    CONSTRAINT "filmeslista_pkey" PRIMARY KEY ("id")
);
