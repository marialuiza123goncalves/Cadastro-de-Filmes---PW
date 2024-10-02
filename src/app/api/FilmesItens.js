// pages/api/items.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price } = req.body;

    try {
      const newItem = await prisma.item.create({
        data: {
          name,
          price: parseFloat(price), // Insere os dados no banco
        },
      });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Erro ao inserir item." });
    }
  } else if (req.method === 'GET') {
    // Código para buscar os itens (como no exemplo anterior)
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
