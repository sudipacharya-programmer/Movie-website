import React, { useContext,useState, useEffect } from "react";
import { MoviesDataContext } from "../contexts/MoviesContext";
import HeroRight from "./HeroRight";

const AllMovies = () => {
  const GENRE_MAP = {
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
  const { movies, loading, error, searchQuery,activeCategory } = useContext(MoviesDataContext);
  

  const filterdMovies = movies.filter((movie) => {
    const movieTitle = movie.title || movie.original_title || "";
    const movieYear = movie.release_date
      ? movie.release_date.split("-")[0]
      : "";
    const movieGenres = movie.genre_ids
      ? movie.genre_ids
          .map((id) => GENRE_MAP[id]?.toLowerCase() || "")
          .join(" ")
      : "";

    const query = searchQuery || "";
    const search=  movieTitle.toLowerCase().includes(query.toLowerCase()) ||
      movieYear.toLowerCase().includes(query) ||
      movieGenres.includes(query);
       const categoryMatch = 
    activeCategory === "all" || 
    (movie.genre_ids && movie.genre_ids.includes(Number(activeCategory)));


    return search && categoryMatch;
  });



  // 1. Loading State (Modern Loader)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-white">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin mb-3"></div>
        <p className="text-gray-400 font-medium">loading...</p>
      </div>
    );
  }

  // 2. Error or Empty State Handling
  if (error || !filterdMovies || filterdMovies == 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-73px)] text-white text-center px-4">
        <div className="text-4xl mb-2">⚠️</div>
        <p className="text-red-500 font-semibold text-lg">
          {error || "No movies found!"}
        </p>
      </div>
    );
  }

  // 3. Main Component Render (Data Loaded Successfully)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#111] min-h-screen text-white">
      {/* Section Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-red-600 pl-3 tracking-wide">
        Trending Movies
      </h1>

      {/* Responsive Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {filterdMovies.map((movie, index) => (
          <div
            key={index}
            className="group bg-[#181818] rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image Section (Standard 2:3 Aspect Ratio) */}
            <div className="relative w-full aspect-[2/3] bg-neutral-800 overflow-hidden">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                /* Fallback text if no image poster exists */
                <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-500 font-medium">
                  No Poster
                </div>
              )}

              {/* Floating Rating Badge */}
              {movie.vote_average && (
                <span className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-md shadow-md">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              )}
            </div>

            {/* Movie Details Section */}
            <div className="p-3 flex flex-col justify-between flex-grow">
              <h3
                className="font-semibold text-sm md:text-base text-neutral-100 truncate group-hover:text-red-500 transition-colors"
                title={movie.title}
              >
                {movie.title}
              </h3>
              {/* Extracting release year safely */}
              <p className="text-xs text-neutral-400 mt-1">
                {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
