import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const filme = await prisma.filmeslista.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return new Response(JSON.stringify(filme), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Retorna todos os filmes se não houver ID
  const filmes = await prisma.filmeslista.findMany();
  return new Response(JSON.stringify(filmes), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(req) {
  // Obtendo o ID da URL diretamente da requisição
  const url = new URL(req.url);
  const id = url.searchParams.get('id'); // Obtendo o ID da query string

  const { titulo, Datalancamento, ano, generoId, diretor } = await req.json(); // Obtendo os dados do corpo da requisição

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID é necessário' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const updatedFilme = await prisma.filmeslista.update({
      where: { id: parseInt(id) }, // Convertendo id para número
      data: {
        titulo,
        Datalancamento: new Date(Datalancamento), // Convertendo para objeto Date
        ano: parseInt(ano), // Convertendo ano para inteiro
        generoId: parseInt(generoId), // Convertendo generoId para inteiro, se necessário
        diretor,
      },
    });
    return new Response(JSON.stringify({ message: "Filme atualizado", updatedFilme }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    return new Response(JSON.stringify({ message: "Erro ao atualizar filme" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
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
  
}
}