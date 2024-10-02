// app/items/page.js
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
          {filmes.map((filmeslista) => (
            <tr key={filmeslista.id}>
              <td className="border border-gray-300 p-2">{filmeslista.id}</td>
              <td className="border border-gray-300 p-2">{filmeslista.titulo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
