"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ItemsPage() {
  const [filmes, setFilmes] = useState([]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // obter os filmes
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items');
      const data = await response.json();
      setFilmes(data);
    };

    fetchItems();
  }, []);

  // Fdeletar um filme
  const handleDelete = async (e, id) => {
    try {
      const response = await fetch(`/api/items/?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao deletar filme');
      }

      router.refresh();
    } catch (error) {
  
    }
  };

  // redirecionar para a página de edição
  const handleEdit = (id) => {
    router.push(`Filmes/edit/?id=${id}`);
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista de Filmes</h1>
        
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-500 text-white p-4 rounded-tl-lg">ID</th>
              <th className="bg-blue-500 text-white p-4">Título</th>
              <th className="bg-blue-500 text-white p-4">Ano</th>
              <th className="bg-blue-500 text-white p-4">Diretor</th>
              <th className="bg-blue-500 text-white p-4">Gênero</th>
              <th className="bg-blue-500 text-white p-4 rounded-tr-lg">Opções</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {filmes.map((filmeslista) => (
              <tr key={filmeslista.id} className="hover:bg-gray-100 transition-colors">
                <td className="border border-gray-300 p-3 text-center">{filmeslista.id}</td>
                <td className="border border-gray-300 p-3">{filmeslista.titulo}</td>
                <td className="border border-gray-300 p-3 text-center">{filmeslista.ano}</td>
                <td className="border border-gray-300 p-3">{filmeslista.diretor}</td>
                <td className="border border-gray-300 p-3 text-center">{filmeslista.genero}</td>
                <td className="border border-gray-300 p-3 text-center">
                  <button
                    onClick={() => handleEdit(filmeslista.id)}
                    className="bg-yellow-500 text-white hover:bg-yellow-600 py-1 px-4 rounded-lg mr-2 transition-colors"
                  >
                    Editar
                  </button>
                  <form onSubmit={(e) => handleDelete(e, filmeslista.id)} className="inline-block">
                    <button
                      type="submit"
                      className="bg-red-500 text-white hover:bg-red-600 py-1 px-4 rounded-lg transition-colors"
                    >
                      Excluir
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
