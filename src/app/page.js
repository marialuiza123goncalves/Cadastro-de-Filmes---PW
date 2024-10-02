import ItemsPage from './Pages/filmes.js';
import Link from 'next/link';

export function LinkInsert() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Página De Inserir</h1>
      <Link href="/insert" className="text-blue-500">
        Ir para página de inserção
      </Link>
    </div>
  );
}


export default function Home() {
  return (
    <div>
      <ItemsPage />
      <LinkInsert />
    </div>
  );
}

