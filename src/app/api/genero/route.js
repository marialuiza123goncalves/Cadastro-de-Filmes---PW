import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const GeneroFilmeID = await prisma.genero.findUnique({
      where: {
        id: parseInt(id), 
      },
    });

    return new Response(JSON.stringify(GeneroFilmeID), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const GeneroFilme = await prisma.genero.findMany();
  return new Response(JSON.stringify(GeneroFilme), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function PUT(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id'); 

  const { nome } = await req.json(); 

  try {
    const updatedGenero = await prisma.genero.update({
      where: { id: parseInt(id) },
      data: {
        nome,
      },
    });
    return new Response(JSON.stringify({ message: "Genero atualizado", updatedGenero }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {

  }
}


export async function POST(request) {
  const {  nome } = await request.json();

  const newItem = await prisma.genero.create({
    data: {
      nome
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); 
  try {
    await prisma.genero.delete({
      where: { id: parseInt(id) }, 
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
  
}
}