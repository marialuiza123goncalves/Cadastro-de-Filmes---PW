"use client";

import { useEffect, useState } from 'react';

export default function ItemsPage() {
  const [filmes, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

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
                  <button className="bg-yellow-500 text-white hover:bg-yellow-600 py-1 px-4 rounded-lg mr-2 transition-colors">
                    Editar
                  </button>
                  <button className="bg-red-500 text-white hover:bg-red-600 py-1 px-4 rounded-lg transition-colors">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
