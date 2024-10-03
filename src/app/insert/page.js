"use client";
import { useState, useEffect } from 'react';

export default function InsertPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [generos, setGeneros] = useState([]);

    useEffect(() => {
      const fetchItems = async () => {
      const response = await fetch('../api/genero');
      const data = await response.json();
      setGeneros(data);
    };
  
      fetchItems();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const titulo = formData.get('titulo');
    const Datalancamento = new Date(formData.get('lancamento'));
    const ano = parseInt(formData.get('ano'));
    const generoId = parseInt(selectedOption); 
    const diretor = formData.get('diretor');

    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, Datalancamento, ano, generoId, diretor }),
    });

    if (response.ok) {
      e.target.reset();
      window.location.href = 'http://localhost:3000/'; 
    } else {
      console.error('Erro ao adicionar item');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inserir Novo Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">Título:</label>
          <input
            type="text"
            name="titulo"
            className="border rounded p-2 w-full"
            required
          />
          <label className="block text-sm font-bold">Lançamento:</label>
          <input
            type="date"
            name="lancamento" // Input do tipo data
            className="border rounded p-2 w-300"
            required
          />
          <label className="block text-sm font-bold">Ano:</label>
          <input
            type="number"
            name="ano"
            className="border rounded p-2 w-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold">Escolha um Gênero:</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)} // Atualiza o estado quando o usuário seleciona um gênero
            className="border rounded p-2 w-full"
            required
          >
            <option value="" disabled>Selecione um Gênero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </div>

        <label className="block text-sm font-bold">Diretor:</label>
          <input
            type="text"
            name="diretor"
            className="border rounded p-2 w-300"
            required
          />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Adicionar Item
        </button>
      </form>
    </div>
  );
}
