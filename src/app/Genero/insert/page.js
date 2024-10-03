"use client";
import { useState, useEffect } from 'react';

export default function InsertGenero() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nome = formData.get('nome');

    const response = await fetch('/api/genero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    });

    if (response.ok) {
      e.target.reset();
      window.location.href = 'http://localhost:3000/Genero/'; 
    } else {
      console.error('Erro ao adicionar item');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inserir Genero</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">Título:</label>
          <input
            type="text"
            name="nome"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Adicionar Item
        </button>
      </form>
    </div>
  );
}
