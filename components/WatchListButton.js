"use client";

import { useEffect, useState } from 'react';

const WatchlistButton = ({ movieId }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setIsInWatchlist(watchlist.includes(movieId));
  }, [movieId]);

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (isInWatchlist) {
      const updatedWatchlist = watchlist.filter(id => id !== movieId);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      console.log(`Removing movie with ID: ${movieId} from watchlist`);
    } else {
      watchlist.push(movieId);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      console.log(`Adding movie with ID: ${movieId} to watchlist`);
    }
    
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <button
      onClick={toggleWatchlist}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
};

export default WatchlistButton;

