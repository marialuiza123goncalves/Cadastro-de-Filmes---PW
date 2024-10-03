import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const Genero = await prisma.genero.findMany();
  return new Response(JSON.stringify(Genero), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}