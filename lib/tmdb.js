const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies(page = 1) {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  const data = await response.json();
  return data.results; 
}

export async function searchMovies(query, page = 1) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to search for movies');
  }
  const data = await response.json();
  return data.results;
}
