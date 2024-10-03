"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditFilme() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [Datalancamento, setDatalancamento] = useState('');
  const [ano, setAno] = useState('');
  const [generoId, setGeneroId] = useState('');
  const [diretor, setDiretor] = useState('');
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const fetchGeneros = async () => {
      const response = await fetch('../api/genero');
      const data = await response.json();
      setGeneros(data);
    };

    fetchGeneros();
  }, []);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');

    const fetchFilme = async () => {
      const response = await fetch(`/api/items?id=${id}`);
      if (response.ok) {
        const filme = await response.json();
        setTitulo(filme.titulo);
        setDatalancamento(filme.Datalancamento.split('T')[0]);
        setAno(filme.ano);
        setGeneroId(filme.generoId);
        setDiretor(filme.diretor);
      } else {
        console.error('Erro ao buscar filme:', response.statusText);
      }
    };

    fetchFilme();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/items?id=${new URLSearchParams(window.location.search).get('id')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, Datalancamento, ano, generoId, diretor }),
    });

    if (response.ok) {
      router.push('/');
    } else {
      console.error('Erro ao atualizar filme');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-5 text-white text-center bg-blue-600 text-white p-2 rounded-lg">Editar Filme</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-1">Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Data de Lançamento:</label>
            <input
              type="date"
              value={Datalancamento}
              onChange={(e) => setDatalancamento(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Ano:</label>
            <input
              type="number"
              min="0"
              max="2030"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="border rounded p-2 w-full"
              required
              onInput={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value < 0 || value > 2030) {
                  e.target.setCustomValidity("Por favor, insira um ano entre 0000 e 2030.");
                } else if (!/^\d{4}$/.test(e.target.value) && e.target.value !== '') {
                  e.target.setCustomValidity("Por favor, insira exatamente 4 dígitos.");
                } else {
                  e.target.setCustomValidity(""); 
                }
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Gênero:</label>
            <select
              value={generoId}
              onChange={(e) => setGeneroId(e.target.value)}
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
            <label className="block text-sm font-bold mb-1">Diretor:</label>
            <input
              type="text"
              value={diretor}
              onChange={(e) => setDiretor(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-500"
          >
            Atualizar Filme
          </button>
        </form>
      </div>
    </div>
  );
}
