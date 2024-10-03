import ItemsPage from './Pages/filmes.js'; ////primeira página
import Link from 'next/link';

export function LinkInsert() {
  return (
    <div className="container mx-auto mt-6 flex justify-center">
      <Link href="Filmes/insert">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-300 hover:bg-blue-500 transition-colors shadow-md">
          Adicionar Filme
        </button>
      </Link>
    </div>
  );
}

export function LinkGenero() {
  return (
    <div className="container mx-auto mt-6 flex justify-center">
      <Link href="/Genero">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-300 hover:bg-blue-500 transition-colors shadow-md">
          Lista de Generos
        </button>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white p-6 shadow-lg text-center">
        <h1 className="text-4xl font-bold">Gerenciador de Filmes</h1>
      </header>

      <main className="flex-grow py-8">
        <LinkInsert /> {/* Link estilizado para a página de inserção */}
        <LinkGenero /> 
        <ItemsPage /> {/* Página de filmes */}
      </main>

      <footer className="bg-gray-100 text-center text-gray-600 py-4 mt-6">
        &copy; 2024 - Gerenciador de Filmes
      </footer>
    </div>
  );
}
