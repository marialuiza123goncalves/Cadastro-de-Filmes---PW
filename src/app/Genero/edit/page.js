"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 

export default function EditarGenero() {
  const [nome, setNome] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); 

  useEffect(() => {
    const fetchGenero = async () => {
      try {
        const response = await fetch(`/api/genero/?id=${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do gênero');
        }
        const data = await response.json();
        setNome(data.nome); 
      } catch (error) {
        setMessage(error.message);
      }
    };

    if (id) {
      fetchGenero(); 
    }
  }, [id]);

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

      if (response.ok) {
        router.push('/Genero'); 
      } else {
        throw new Error('Erro ao atualizar o gênero');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Editar Gênero</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Nome do Gênero:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          {message && (
            <div className="text-red-500 text-sm text-center">
              {message}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-500"
          >
            Atualizar Gênero
          </button>
        </form>
      </div>
    </div>
  );
}
