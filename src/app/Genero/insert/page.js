"use client";
import { useState, useEffect } from 'react';

export default function InsertGenero() {
  const [generos, setGeneros] = useState([]); // Para armazenar os gêneros existentes
  const [errorMessage, setErrorMessage] = useState(''); // Para armazenar mensagens de erro

  useEffect(() => {
    // Função para buscar os gêneros existentes
    const fetchGeneros = async () => {
      const response = await fetch('/api/genero');
      const data = await response.json();
      setGeneros(data);
    };

    fetchGeneros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nome = formData.get('nome');

    // Verifica se o gênero já existe
    if (generos.some((genero) => genero.nome.toLowerCase() === nome.toLowerCase())) {
      setErrorMessage('Já existe um gênero com esse nome.');
      return;
    }

    const response = await fetch('/api/genero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    });

    if (response.ok) {
      e.target.reset();
      setErrorMessage(''); // Limpa a mensagem de erro
      window.location.href = 'http://localhost:3000/Genero/'; 
    } else {
      console.error('Erro ao adicionar item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Inserir Gênero</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Nome:</label>
            <input
              type="text"
              name="nome"
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-500"
          >
            Adicionar Gênero
          </button>
        </form>
      </div>
    </div>
  );
}
