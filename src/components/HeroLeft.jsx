import React, { useContext, useState } from "react";
import {
  FiHome,
  FiSearch,
  FiGrid,
  FiTv,
  FiMusic,
  FiHeart,
  FiClock,
  FiActivity,
  FiX,
} from "react-icons/fi";
import { GiSparkles, GiBookPile } from "react-icons/gi";
import { MoviesDataContext } from "../contexts/MoviesContext";

const HeroLeft = () => {
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(MoviesDataContext);

  const handleSearchClick = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <div className="w-64 h-full bg-[#111111] text-[#9b9b9b] flex flex-col p-5 border-r border-[#1f1f1f] font-sans selection:bg-emerald-500 selection:text-black">
      <div className="text-3xl font-black tracking-tight text-white px-3 mb-8 flex items-center">
        iframe<span className="text-emerald-400">.</span>
      </div>

      <div className="bg-[#161616] rounded-2xl p-2 mb-6 border border-[#222222]">
        <nav className="space-y-1">
          
          <a
            href="#"
            className="flex items-center space-x-3.5 bg-[#242424] text-white px-4 py-3 rounded-xl font-semibold transition duration-200"
          >
            <FiHome className="w-5 h-5 text-white" />
            <span className="text-sm">Home</span>
          </a>

          <button
            onClick={handleSearchClick}
            className="w-full flex items-center space-x-3.5 hover:bg-[#1c1c1c] hover:text-white px-4 py-3 rounded-xl font-medium transition duration-200 group text-left"
          >
            <FiSearch className="w-5 h-5 group-hover:text-white transition" />
            <span className="text-sm">Search</span>
          </button>

          {isSearchOpen && (
            <div className="flex items-center bg-[#1c1c1c] rounded-xl px-3 py-2 mt-1 border border-[#2a2a2a] animate-in fade-in duration-150">
              <FiSearch className="w-4 h-4 text-[#666666] mr-2 flex-shrink-0" />
              <input
              onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                autoFocus
                placeholder="Search..."
                className="bg-transparent text-sm text-white placeholder-[#666666] outline-none w-full"
              />
              <button
                onClick={handleSearchClick}
                aria-label="Close search"
                className="ml-2 text-[#666666] hover:text-white transition"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          )}

        
          <a
            href="#"
            className="flex items-center space-x-3.5 hover:bg-[#1c1c1c] hover:text-white px-4 py-3 rounded-xl font-medium transition duration-200 group"
          >
            <FiGrid className="w-5 h-5 group-hover:text-white transition" />
            <span className="text-sm">Browse</span>
          </a>
        </nav>
      </div>

      <div className="text-[11px] font-bold tracking-widest text-[#555555] uppercase px-4 mb-3">
        Media
      </div>

      <nav className="flex-1 space-y-1 px-1 overflow-y-auto custom-scrollbar">
        <a href="#" className="flex items-center space-x-3.5 hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group">
          <FiTv className="w-5 h-5 text-[#888888] group-hover:text-white transition" />
          <span className="text-sm">TV Shows</span>
        </a>
        <a href="#" className="flex items-center space-x-3.5 hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group">
          <GiSparkles className="w-5 h-5 text-[#888888] group-hover:text-white transition" />
          <span className="text-sm">Anime</span>
        </a>
        <a href="#" className="flex items-center space-x-3.5 hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group">
          <GiBookPile className="w-5 h-5 text-[#888888] group-hover:text-white transition" />
          <span className="text-sm">Manga</span>
        </a>
        <a href="#" className="flex items-center space-x-3.5 hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group">
          <FiMusic className="w-5 h-5 text-[#888888] group-hover:text-white transition" />
          <span className="text-sm">Music</span>
        </a>
        <a href="#" className="flex items-center space-x-3.5 hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group">
          <FiActivity className="w-5 h-5 text-[#888888] group-hover:text-white transition" />
          <span className="text-sm">Live Sports</span>
        </a>
        <a href="#" className="flex items-center space-x-3.5 hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group">
          <FiHeart className="w-5 h-5 text-[#888888] group-hover:text-white transition" />
          <span className="text-sm">Watchlist</span>
        </a>
        <a href="#" className="flex items-center space-x-3.5 hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group">
          <FiClock className="w-5 h-5 text-[#888888] group-hover:text-white transition" />
          <span className="text-sm">History</span>
        </a>
      </nav>
    </div>
  );
};

export default HeroLeft;
