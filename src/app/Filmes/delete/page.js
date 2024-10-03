// src/app/delete/page.js
"use client";
import { useState } from 'react';

const DeletePage = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`/api/items/?id=${id}`, {
            method: 'DELETE',
        });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao deletar filme');
      }

      setMessage(data.message);
      setId(''); // Limpa o campo de ID
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deletar Filme</h1>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">ID do Filme:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded w-full">
          Deletar Filme
        </button>
      </form>
      {message && <div className="mt-4">{message}</div>}
    </div>
  );
};

export default DeletePage;
