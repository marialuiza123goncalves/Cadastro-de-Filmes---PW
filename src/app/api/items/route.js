// app/api/items/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const filmes = await prisma.filmeslista.findMany();
  return new Response(JSON.stringify(filmes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request) {
  const { titulo } = await request.json();

  const newItem = await prisma.filmeslista.create({
    data: {
      titulo,
    },
  });

  return new Response(JSON.stringify(newItem), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
