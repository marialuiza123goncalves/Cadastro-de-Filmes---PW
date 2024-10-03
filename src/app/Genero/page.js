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
      setGeneros(data);
    };

    fetchGeneros();
  }, []);

  const handleAddNewGenre = () => {
    router.push('/Genero/insert');
  };

  const handleGoHome = () => {
    router.push('/'); 
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

        <table className="min-w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr>
              <th className="bg-blue-500 text-white p-3">ID</th>
              <th className="bg-blue-500 text-white p-3">Nome</th>
            </tr>
          </thead>
          <tbody>
            {Generos.map((genero) => (
              <tr key={genero.id} className="text-center">
                <td className="border border-gray-300 p-3">{genero.id}</td>
                <td className="border border-gray-300 p-3">{genero.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleGoHome}
          className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-500">
          Voltar
        </button>
      </div>
    </div>
  );
}
