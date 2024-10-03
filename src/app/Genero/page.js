"use client";

import { useEffect, useState } from 'react';

export default function ListaGeneros() {
  const [Generos, setGeneros] = useState([]);

  useEffect(() => {
    const fetchGeneros = async () => {
      const response = await fetch('/api/genero');
      const data = await response.json();
      setGeneros(data);
    };

    fetchGeneros();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Itens</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nome</th>
            <th className="border border-gray-300 p-2">Preço</th>
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
