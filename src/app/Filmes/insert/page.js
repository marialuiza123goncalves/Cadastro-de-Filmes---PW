"use client";
import { useState, useEffect } from 'react';

export default function InsertFilme() {
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
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-5 text-white text-center bg-blue-600 text-white p-2 rounded-lg">Inserir Novo Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold">Título:</label>
            <input
              type="text"
              name="titulo"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold">Lançamento:</label>
            <input
              type="date"
              name="lancamento"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold">Ano:</label>
            <input
              min="0"
              max="2030"
              type="number"
              name="ano"
              className="border rounded p-2 w-full"
              required
              onInput={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value < 0 || value > 2030) {
                  e.target.setCustomValidity("Por favor, insira um ano entre 0000 e 2030.");
                } else if (!/^\d{4}$/.test(e.target.value) && e.target.value !== '') {
                  e.target.setCustomValidity("Por favor, insira exatamente 4 dígitos.");
                } else {
                  e.target.setCustomValidity(""); // Limpa a mensagem de erro se válido
                }
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-bold">Escolha um Gênero:</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
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

          <div>
            <label className="block text-sm font-bold">Diretor:</label>
            <input
              type="text"
              name="diretor"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Adicionar Item
          </button>
        </form>
      </div>
    </div>
  );
}
