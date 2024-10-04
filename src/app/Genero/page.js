"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ListaGeneros() {
  const [Generos, setGeneros] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchGeneros = async () => {
      const response = await fetch('/api/genero');
      const data = await response.json();
      const sortedGeneros = data.sort((a, b) => a.id - b.id);
      setGeneros(sortedGeneros);
    };

    fetchGeneros();
  }, []);

  const handleAddNewGenre = () => {
    router.push('/Genero/insert');
  };

  const handleGoHome = () => {
    router.push('/'); 
  };

  // Deletar um gênero
  const handleDelete = async (e, id) => {
    try {
      const response = await fetch(`/api/genero/?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao deletar gênero');
      }

      // Atualiza a lista de gêneros após a exclusão
      setGeneros((prevGeneros) => prevGeneros.filter((genero) => genero.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleEdit = (id) => {
    router.push(`Genero/edit/?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Lista de Gêneros</h1>

        <button
          onClick={handleAddNewGenre}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-500 w-full"
        >
          Adicionar Novo Gênero
        </button>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {Generos.map((genero) => (
              <tr key={genero.id}>
                <td className="border border-gray-300 p-2">{genero.id}</td>
                <td className="border border-gray-300 p-2">{genero.nome}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    className="bg-yellow-500 text-white hover:bg-yellow-600 py-1 px-4 rounded-lg mr-2"
                    onClick={() => handleEdit(genero.id)}
                  >
                    Editar
                  </button>
                  <form onSubmit={(e) => handleDelete(e, genero.id)} className="inline-block">
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
        <button
          onClick={handleGoHome}
          className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-500 mt-4"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
