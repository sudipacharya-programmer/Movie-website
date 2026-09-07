import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MoviesDataContext = createContext();

// Provider component that shares data across the application
export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const API_KEY = "e9097b137e5e9bacd6efb85111071284";
        const urls = Array.from({ length: 5 }, (_, index) =>
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${index + 1}`
        );
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const allMovies = responses.flatMap(res => res.data.results);
        console.log("Fetched movies:", allMovies);
        setMovies(allMovies);
      } catch (err) {
        console.error("API Error:", err);
        setError("cant load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <MoviesDataContext.Provider value={{ movies, loading, error }}>
      {children}
    </MoviesDataContext.Provider>
  );
};
