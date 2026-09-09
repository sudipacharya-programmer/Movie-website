import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MoviesDataContext = createContext(null);
export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
const MOVIES_CACHE_KEY = "movie-trending-cache";
const CACHE_DURATION = 5 * 60 * 1000;

// Provider component that shares data across the application
export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const controller = new AbortController();

    const fetchTrendingMovies = async () => {
      try {
        const cachedMovies = sessionStorage.getItem(MOVIES_CACHE_KEY);
        if (cachedMovies) {
          const { movies: cachedResults, timestamp } = JSON.parse(cachedMovies);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setMovies(cachedResults);
            setLoading(false);
            return;
          }
        }

        const API_KEY =
          import.meta.env.VITE_TMDB_API_KEY ||
          "e9097b137e5e9bacd6efb85111071284";

        const urls = Array.from(
          { length: 3 },
          (_, index) =>
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${index + 1}`,
        );
        const responses = await Promise.all(
          urls.map((url) => axios.get(url, { signal: controller.signal })),
        );
        const allMovies = [
          ...new Map(
            responses
              .flatMap((response) => response.data.results)
              .map((movie) => [movie.id, movie]),
          ).values(),
        ];

        setMovies(allMovies);
        sessionStorage.setItem(
          MOVIES_CACHE_KEY,
          JSON.stringify({ movies: allMovies, timestamp: Date.now() }),
        );
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error("API Error:", err);
        setError("Unable to load movies. Check your API configuration.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTrendingMovies();
    return () => controller.abort();
  }, []);

  return (
    <MoviesDataContext.Provider
      value={{
        movies,
        loading,
        error,
        setSearchQuery,
        searchQuery,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </MoviesDataContext.Provider>
  );
};
