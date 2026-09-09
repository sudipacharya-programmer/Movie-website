import React, { useContext } from "react";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { WatchlistContext } from "../contexts/context";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);

  if (watchlist.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center bg-[#111] px-4 text-center text-white">
        <FiHeart className="mb-4 h-12 w-12 text-neutral-600" />
        <h1 className="text-2xl font-bold">Your watchlist is empty</h1>
        <p className="mt-2 text-neutral-400">
          Add movies to find them here later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] px-4 py-8 text-white">
      <h1 className="mb-6 border-l-4 border-red-600 pl-3 text-2xl font-bold">
        My Watchlist
      </h1>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {watchlist.map((movie) => (
          <div
            key={movie.id}
            className="overflow-hidden rounded-xl bg-[#181818] shadow-lg"
          >
            <Link to={`/movie/${movie.id}`} className="block">
              <div className="aspect-[2/3] bg-neutral-800">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-neutral-500">
                    No Poster
                  </div>
                )}
              </div>
              <div className="p-3">
                <h2 className="truncate font-semibold">
                  {movie.title || movie.name}
                </h2>
                <p className="mt-1 text-xs text-neutral-400">
                  {movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "N/A"}
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => removeFromWatchlist(movie.id)}
              className="m-3 flex items-center gap-2 rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-300 transition hover:border-red-600 hover:text-red-500"
            >
              <FiTrash2 />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
