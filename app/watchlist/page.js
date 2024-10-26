"use client";

import { useEffect, useState } from 'react';

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  const fetchWatchlistMovies = async () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const movies = await Promise.all(
      watchlist.map(async (id) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        return res.json();
      })
    );
    setWatchlistMovies(movies);
  };

  useEffect(() => {
    fetchWatchlistMovies();
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedWatchlist = watchlistMovies.filter(movie => movie.id !== id);
    setWatchlistMovies(updatedWatchlist);
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const newWatchlist = watchlist.filter(mId => mId !== id);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Your Watchlist</h1>
      {watchlistMovies.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlistMovies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h4 className="font-bold">{movie.title}</h4>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove from Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;

  