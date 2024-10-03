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
  const {  titulo, Datalancamento, ano, generoId, diretor } = await request.json();

  const newItem = await prisma.filmeslista.create({
    data: {
      titulo, 
      Datalancamento, 
      ano, 
      generoId, 
      diretor
    },
  });

  return new Response(JSON.stringify(newItem), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function DELETE(req) {
  // Extraindo o ID da query string
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Obtém o ID da query string

  // Verifica se o ID foi fornecido
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID é necessário' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Deleta o filme usando o ID
    await prisma.filmeslista.delete({
      where: { id: parseInt(id) }, // Converte o ID para inteiro
    });

    // Retorna uma resposta 204 No Content
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error('Erro ao deletar filme:', error);
    return new Response(JSON.stringify({ message: "Erro ao deletar filme" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}