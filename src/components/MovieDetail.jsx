import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GENRE_MAP, MoviesDataContext } from "../contexts/MoviesContext";
import { WatchlistContext } from "../contexts/context";
import { FiArrowLeft, FiPlus, FiShare2, FiDownload, FiPlay } from "react-icons/fi";

const MovieDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { movies } = useContext(MoviesDataContext);
  const { isInWatchlist, toggleWatchlist } = useContext(WatchlistContext);

  // एरे भित्रबाट यो ID सँग मिल्ने मुभी खोजेको
  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0d0d] text-white">
        <p className="text-gray-400 text-lg">Movie data details not found!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#0d0d0d] text-white font-sans overflow-hidden">
      
      {/* LEFT CONTENT AREA: Video Player & Lower Control Panel */}
      <div className="flex-1 flex flex-col p-4 bg-[#0a0a0a]">
        
        {/* Header bar with Back button and movie Title */}
        <div className="flex items-center space-x-4 mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="hover:bg-neutral-800 p-2 rounded-full transition text-neutral-300 hover:text-white"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold tracking-tight">{movie.title || movie.name}</h1>
        </div>

        {/* Video Player Display Container (Using Backdrop Image as mock background) */}
        <div className="relative w-full flex-1 aspect-video bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-900">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt="Video display panel placeholder" 
            className="absolute inset-0 w-full h- object-contain bg-black brightness-[0.4]" 
          />
          
          {/* Centered Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-full shadow-2xl transition transform hover:scale-110">
              <FiPlay className="w-8 h-8 fill-white ml-1" />
            </button>
          </div>

          {/* Bottom mock video controls track bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center space-x-3">
              <span>▶</span>
              <span>00:00 / 02:15:00</span>
            </div>
            <span>1920x1080 HD</span>
          </div>
        </div>

        {/* Lower Action Action Bar Component */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div>
            <p className="text-xs text-neutral-500 font-medium">Now Playing</p>
            <h2 className="text-base font-semibold text-neutral-200">{movie.title || movie.name}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleWatchlist(movie)}
              className="bg-neutral-900 hover:bg-neutral-800 p-2.5 rounded-xl border border-neutral-800 transition"
              title={isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
              aria-label={isInWatchlist(movie.id) ? "Remove from watchlist" : "Add to watchlist"}
            >
              <FiPlus className={`w-5 h-5 text-neutral-300 ${isInWatchlist(movie.id) ? "rotate-45 text-red-500" : ""}`} />
            </button>
            <button className="bg-neutral-900 hover:bg-neutral-800 p-2.5 rounded-xl border border-neutral-800 transition" title="Share title">
              <FiShare2 className="w-5 h-5 text-neutral-300" />
            </button>
            <button className="bg-neutral-900 hover:bg-neutral-800 p-2.5 rounded-xl border border-neutral-800 transition" title="Download video offline">
              <FiDownload className="w-5 h-5 text-neutral-300" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR PANEL: Metadata and Description Readout */}
      <div className="w-full lg:w-96 border-l border-neutral-900 bg-[#0f0f0f] p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
        <div className="space-y-6">
          
          {/* Movie mini card summary profile */}
          <div className="flex space-x-4 bg-neutral-950/40 p-3 rounded-xl border border-neutral-900">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title} 
              className="w-24 aspect-[2/3] object-cover rounded-lg shadow-md"
            />
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-1.5 text-yellow-400 font-bold text-sm">
                <span>⭐</span>
                <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
              </div>
              <p className="text-neutral-500 font-medium">Status</p>
              <p className="text-neutral-200 font-semibold mb-1">Released</p>
              <p className="text-neutral-500 font-medium">Aired</p>
              <p className="text-neutral-200 font-semibold">{movie.release_date || "N/A"}</p>
            </div>
          </div>

          {/* Story Overview Summary Block */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">{movie.title}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed break-words bg-neutral-950/20 p-4 rounded-xl border border-neutral-900/60">
              {movie.overview || "No extended plot summary layout details available for this media asset item."}
            </p>
          </div>

          {/* Genre Pill Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {movie.genre_ids?.length ? movie.genre_ids.map((genreId) => (
              <span 
                key={genreId} 
                className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-3 py-1.5 rounded-lg font-medium shadow-sm"
              >
                {GENRE_MAP[genreId] || "Unknown genre"}
              </span>
            )) : (
              <span className="text-sm text-neutral-500">Genre information unavailable</span>
            )}
          </div>
        </div>

        {/* Dynamic Trailer Anchor Segment */}
        <div className="mt-8 border-t border-neutral-900 pt-4">
          <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3">Trailers</h4>
          <button className="w-full flex items-center justify-between bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 p-3.5 rounded-xl transition text-sm font-medium group">
            <span className="text-neutral-300 group-hover:text-white">Official Trailer</span>
            <span className="text-neutral-500 group-hover:text-red-500 transition-colors">▷</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default MovieDetail;
