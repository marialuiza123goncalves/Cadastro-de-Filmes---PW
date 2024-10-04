// pages/api/inserirFilmes.js
import prisma from '../../../../prisma/prisma'; 

const OMDB_API_KEY = '6e676d66'; 
const PegaFilmesOMDb = async (title) => {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
  const data = await response.json();
  if (data.Response === "True") {
    return data;
  } else {
    throw new Error(data.Error);
  }
};

export async function POST(req) {
  try {
    const { titles } = await req.json(); 
    let insertedMovies = [];

    for (let title of titles) {
      const movieData = await PegaFilmesOMDb(title);

      const genres = movieData.Genre.split(',').map(genre => genre.trim());

      let genreIds = [];
      for (let genreName of genres) {
        let genre = await prisma.genero.findUnique({
          where: { nome: genreName },
        });

        if (!genre) {
          genre = await prisma.genero.create({
            data: { nome: genreName },
          });
        }

        genreIds.push(genre.id);
      }

      const newMovie = await prisma.filmeslista.create({
        data: {
          titulo: movieData.Title,
          ano: parseInt(movieData.Year),
          diretor: movieData.Director,
          Datalancamento: new Date(movieData.Released),
          generoId: genreIds[0],
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