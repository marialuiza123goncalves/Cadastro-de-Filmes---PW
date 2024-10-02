// app/insert/page.js
"use client";

export default function InsertPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    //const id = parseInt(formData.get('id'));
    const titulo = formData.get('titulo');

    // Chama a API para inserir o novo item
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo }),
    });

    if (response.ok) {
      e.target.reset(); // Limpa o formulário
    } else {
      console.error('Erro ao adicionar item');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inserir Novo Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">Titulo:</label>
          <input
            type="text"
            name="titulo"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar Item
        </button>
      </form>
    </div>
  );
}
