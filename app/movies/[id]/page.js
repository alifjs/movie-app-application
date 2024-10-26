import Image from 'next/image';
import WatchlistButton from '@/components/WatchListButton';
import { movieSchema, recommendationsSchema } from '@/utils/zodSchemas';
import { z } from 'zod';  

const MovieDetails = async ({ params }) => {
  const { id } = params;

  try {
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const movieData = await movieRes.json();
    const movie = movieSchema.parse(movieData);

    const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const credits = await creditsRes.json();

    const recommendationsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, {
      next: { revalidate: 60 },
    });
    const recommendationsData = await recommendationsRes.json();
    const recommendations = recommendationsSchema.parse(recommendationsData);

    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">{movie.title}</h1>
        <div className="flex justify-center mb-4">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg shadow-md"
          />
        </div>
        <p className="text-gray-700 text-lg mb-2">{movie.overview}</p>
        <p className="text-gray-600 font-semibold"><strong>Release Date:</strong> {movie.release_date}</p>
        <p className="text-gray-600 font-semibold"><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Cast:</h3>
        <ul className="list-disc list-inside space-y-1">
          {credits.cast.map(member => (
            <li key={member.id} className="text-gray-600">
              <span className="font-bold">{member.name}</span> as {member.character}
            </li>
          ))}
        </ul>

        <WatchlistButton movieId={movie.id} initialIsInWatchlist={false} />

        <h3 className="text-xl font-semibold mt-8 mb-2">Related Movies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.results.map((recommendation) => (
            <div key={recommendation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                alt={recommendation.title}
                width={200}
                height={300}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h4 className="font-bold">{recommendation.title}</h4>
                <p className="text-gray-600">{recommendation.overview.slice(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (
        <div className="max-w-4xl mx-auto p-6 bg-red-100 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-red-800">Validation Error</h1>
          <p className="text-red-600">{error.errors.map(e => e.message).join(', ')}</p>
        </div>
      );
    } else {
      return (
        <div className="max-w-4xl mx-auto p-6 bg-red-100 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-red-800">Error</h1>
          <p className="text-red-600">Something went wrong while fetching movie details.</p>
        </div>
      );
    }
  }
};

export async function generateStaticParams() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  const data = await res.json();

  return data.results.map(movie => ({
    id: movie.id.toString(),
  }));
}

export default MovieDetails;

