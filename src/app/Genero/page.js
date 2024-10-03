"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa o useRouter

export default function ListaGeneros() {
  const [Generos, setGeneros] = useState([]);
  const router = useRouter(); // Inicializa o useRouter para navegação

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Gêneros</h1>

      <button
        onClick={handleAddNewGenre}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Novo Gênero
      </button>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nome</th>
          </tr>
        </thead>
        <tbody>
          {Generos.map((genero) => (
            <tr key={genero.id}>
              <td className="border border-gray-300 p-2">{genero.id}</td>
              <td className="border border-gray-300 p-2">{genero.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
