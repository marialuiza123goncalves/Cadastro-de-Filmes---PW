-- CreateTable
CREATE TABLE "genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filmeslista" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "Datalancamento" TIMESTAMP(3) NOT NULL,
    "generoId" INTEGER NOT NULL,
    "diretor" TEXT NOT NULL,

    CONSTRAINT "filmeslista_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genero_nome_key" ON "genero"("nome");

-- AddForeignKey
ALTER TABLE "filmeslista" ADD CONSTRAINT "filmeslista_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
