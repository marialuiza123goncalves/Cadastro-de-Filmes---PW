// pages/api/inserirFilmes.js
import prisma from '../../../../prisma/prisma'; // Assumindo que você já configurou o Prisma

const OMDB_API_KEY = '6e676d66'; // Substitua pela sua chave da OMDb API


// Função para buscar um filme da OMDb API
const fetchMovieFromOMDb = async (title) => {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
  const data = await response.json();
  if (data.Response === "True") {
    return data;
  } else {
    throw new Error(data.Error);
  }
};

// Função POST para lidar com a inserção dos filmes e gêneros
export async function POST(req) {
  try {
    const { titles } = await req.json(); // Um array com os títulos dos filmes
    let insertedMovies = [];

    for (let title of titles) {
      const movieData = await fetchMovieFromOMDb(title);

      // Separar os gêneros (alguns filmes têm mais de um gênero, separados por vírgulas)
      const genres = movieData.Genre.split(',').map(genre => genre.trim());

      // Inserir ou buscar cada gênero no banco
      let genreIds = [];
      for (let genreName of genres) {
        let genre = await prisma.genero.findUnique({
          where: { nome: genreName },
        });

        // Se o gênero não existir, criá-lo
        if (!genre) {
          genre = await prisma.genero.create({
            data: { nome: genreName },
          });
        }

        genreIds.push(genre.id);
      }

      // Inserir o filme no banco de dados, associando os gêneros
      const newMovie = await prisma.filmeslista.create({
        data: {
          titulo: movieData.Title,
          ano: parseInt(movieData.Year),
          diretor: movieData.Director,
          Datalancamento: new Date(movieData.Released),
          generoId: genreIds[0], // Considerando que o filme tem um gênero principal
        },
      });

      insertedMovies.push(newMovie);
    }

    return new Response(JSON.stringify({ message: 'Filmes e gêneros inseridos com sucesso!', insertedMovies }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erro ao inserir os filmes e gêneros', details: error.message }), {
      status: 500,
    });
  }
}