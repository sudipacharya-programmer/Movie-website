import React, { useContext, useMemo } from "react";
import { MoviesDataContext } from "../contexts/MoviesContext"; 
import { FaPlay, FaPlus } from "react-icons/fa";

const HeroRight = () => {
  
  const { movies, loading, error } = useContext(MoviesDataContext);
  const topRatedMovie = useMemo(
    () =>
      movies.length
        ? movies.reduce(
            (max, movie) =>
              movie.vote_average > max.vote_average ? movie : max,
            movies[0],
          )
        : null,
    [movies],
  );

  // 1. Loading UI (Prevents code from crashing while waiting for the API response)
  if (loading) {
    return (
      <div className="w-full h-[500px] rounded-3xl bg-[#161616] border border-[#222222] flex items-center justify-center text-gray-400 font-semibold animate-pulse">
        Loading...
      </div>
    );
  }

  // 2. Error UI Handling
  if (error || !movies || movies.length === 0) {
    return (
      <div className="w-full h-[400px] rounded-3xl bg-[#161616] border border-red-900/30 flex items-center justify-center text-red-500 font-semibold">
        {error || "Failed to load movie data."}
      </div>
    );
  }

  // Building the backdrop image URL sequence for TMDB assets
  const backdropUrl = `https://image.tmdb.org/t/p/original${topRatedMovie?.backdrop_path}`;

  return (
    <div className="flex-1  overflow-y-auto bg-[#111111] text-white px-8 space-y-10 font-sans custom-scrollbar">
      <div
        className="h-3/4  rounded-3xl bg-cover bg-center bg-no-repeat relative overflow-hidden flex items-center py-10 px-12 md:px-16 border border-[#222222] shadow-2xl"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent -z-10"></div>
        <div className="absolute inset-0 bg-black/30 -z-10"></div>

        <div className="max-w-xl space-y-6 z-10 select-none">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-widest uppercase text-white drop-shadow-md leading-tight">
            {topRatedMovie?.title || topRatedMovie?.original_title}
          </h1>

          <p className="text-[#b3b3b3] text-sm md:text-base font-medium leading-relaxed line-clamp-3">
            {topRatedMovie?.overview}
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <button className="bg-white text-black font-extrabold px-8 py-3.5 rounded-2xl flex items-center space-x-3 hover:bg-gray-200 transition duration-300 transform active:scale-95 shadow-xl">
              <FaPlay className="w-3.5 h-3.5" />
              <span className="text-sm tracking-wider font-sans uppercase">
                Play
              </span>
            </button>

            <button className="bg-[#242424]/60 backdrop-blur-md text-white border border-[#333333] p-4 rounded-2xl flex items-center justify-center hover:bg-[#333333] transition duration-300 transform active:scale-95">
              <FaPlus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
