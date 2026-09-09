import React, { createContext, useEffect, useState } from "react";

export const WatchlistContext = createContext(null);

const STORAGE_KEY = "movie-watchlist";

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem(STORAGE_KEY);

    if (!savedWatchlist) {
      return [];
    }

    try {
      const parsedWatchlist = JSON.parse(savedWatchlist);
      return Array.isArray(parsedWatchlist) ? parsedWatchlist : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = (movieId) =>
    watchlist.some((movie) => movie.id === movieId);

  const addToWatchlist = (movie) => {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.some((item) => item.id === movie.id)
        ? currentWatchlist
        : [...currentWatchlist, movie],
    );
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId),
    );
  };

  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
      return;
    }

    addToWatchlist(movie);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
