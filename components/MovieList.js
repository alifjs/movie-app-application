"use client";

import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { fetchPopularMovies, searchMovies } from '../lib/tmdb';
import PaginationComponent from './Pagination'; 
import { useRouter } from 'next/navigation';

export default function MovieList() {
  const router = useRouter(); 
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      if (loading) return;

      setLoading(true);
      try {
        let newMovies;
        if (isSearching) {
          newMovies = await searchMovies(searchTerm, page);
        } else {
          newMovies = await fetchPopularMovies(page);
        }

        if (page === 1) {
          setMovies(newMovies);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        }

        setHasMore(newMovies.length > 0);
        setTotalPages(8); 
      } catch (error) {
        console.error('Failed to load movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page, isSearching, searchTerm]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(1); 
    setIsSearching(value !== ''); 

    if (value === '') {
      setMovies([]); 
    }
  };

  const loadMoreMovies = () => {
    if (page < totalPages && !loading) {
      setPage((prev) => prev + 1); 
    }
  };

  const handleMovieClick = (movie) => {
    router.push(`/movies/${movie.id}`);
    console.log(movie.id);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-grow flex justify-center">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 w-3/4 md:w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
        </div>
        <div className="ml-4"> 
          <PaginationComponent 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={(newPage) => {
              setPage(newPage); 
              setMovies([]); 
            }} 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <p className="text-center mt-4 text-gray-600">Loading...</p>}
      {hasMore && !loading && (
        <div className="text-center mt-6">
          <button 
            onClick={loadMoreMovies} 
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}


