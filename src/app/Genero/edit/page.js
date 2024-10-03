"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Importa o useRouter e useSearchParams

export default function EditarGenero() {
  const [nome, setNome] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Obtém o ID dos parâmetros da URL

  useEffect(() => {
    // Função para buscar os dados do gênero pelo ID
    const fetchGenero = async () => {
      try {
        const response = await fetch(`/api/genero/?id=${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do gênero');
        }
        const data = await response.json();
        setNome(data.nome); // Preenche o nome do gênero no formulário
      } catch (error) {
        setMessage(error.message);
      }
    };

    if (id) {
      fetchGenero(); // Busca os dados do gênero quando o ID está disponível
    }
  }, [id]);

  // Função para lidar com o envio do formulário e atualização do gênero
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/genero/?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });

      const data = await response.json();

      router.push('/Genero'); 
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Gênero</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">Nome do Gênero:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Atualizar Gênero
        </button>
      </form>
    </div>
  );
}
