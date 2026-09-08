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
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useContext(MoviesDataContext);
  
  // Data array configuration mapping custom categories with real TMDB IDs and specific icons
  const GENRE_CATEGORIES = [
    { id: "35", name: "Comedy", icon: FiTv },           // Maps to TV Shows button
    { id: "16", name: "Anime", icon: GiSparkles },      // Maps to Anime button
    { id: "14", name: "Fantasy", icon: GiBookPile },    // Maps to Manga/Fantasy button
    { id: "10402", name: "Music", icon: FiMusic },      // Maps to Music button
    { id: "28", name: "Action", icon: FiActivity },     // Maps to Live Sports/Action button
  ];

  // Click handler function for the search trigger button
  const handleSearchClick = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <div className="w-64 h-full bg-[#111111] text-[#9b9b9b] flex flex-col p-5 border-r border-[#1f1f1f] font-sans selection:bg-emerald-500 selection:text-black">
      {/* Brand logo section */}
      <div className="text-3xl font-black tracking-tight text-white px-3 mb-8 flex items-center">
        iframe<span className="text-emerald-400">.</span>
      </div>

      {/* Top utility menu layout navigation container */}
      <div className="bg-[#161616] rounded-2xl p-2 mb-6 border border-[#222222]">
        <nav className="space-y-1">
          {/* Home navigation link */}
          <a
            href="#"
            className="flex items-center space-x-3.5 bg-[#242424] text-white px-4 py-3 rounded-xl font-semibold transition duration-200"
          >
            <FiHome className="w-5 h-5 text-white" />
            <span className="text-sm">Home</span>
          </a>

          {/* Toggle search layout action button */}
          <button
            onClick={handleSearchClick}
            className="w-full flex items-center space-x-3.5 hover:bg-[#1c1c1c] hover:text-white px-4 py-3 rounded-xl font-medium transition duration-200 group text-left"
          >
            <FiSearch className="w-5 h-5 group-hover:text-white transition" />
            <span className="text-sm">Search</span>
          </button>

          {/* Core expandable handled controlled search input box container */}
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

          {/* Browse navigation link */}
          <a
            href="#"
            className="flex items-center space-x-3.5 hover:bg-[#1c1c1c] hover:text-white px-4 py-3 rounded-xl font-medium transition duration-200 group"
          >
            <FiGrid className="w-5 h-5 group-hover:text-white transition" />
            <span className="text-sm">Browse</span>
          </a>
        </nav>
      </div>

      {/* Media section structural header title */}
      <div className="text-[11px] font-bold tracking-widest text-[#555555] uppercase px-4 mb-3">
        Media
      </div>

      {/* Main categories dynamic display block mapping the data objects configuration array */}
      <div className="flex-1 space-y-1 px-1 overflow-y-auto custom-scrollbar">
        {GENRE_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = activeCategory === category.id;

          return (
            <button 
              key={category.id}
              type="button"
              onClick={() => { setActiveCategory(category.id); setSearchQuery(""); }}
              className={`w-full flex items-center space-x-3.5 px-3 py-3 rounded-xl font-medium transition duration-200 group text-left ${
                isSelected ? "bg-[#1c1c1c] text-white" : "text-[#9b9b9b] hover:bg-[#1c1c1c] hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 transition ${isSelected ? "text-emerald-400" : "text-[#888888] group-hover:text-white"}`} />
              <span className="text-sm">{category.name}</span>
            </button>
          );
        })}

        {/* Decorative layout divider line rule layout element */}
        <div className="h-px bg-[#1f1f1f] my-4 mx-3" />

        {/* Library section structural header title */}
        <div className="text-[11px] font-bold tracking-widest text-[#555555] uppercase px-3 mb-2">
          Library
        </div>

        {/* Watchlist mock placeholder layout element item */}
        <button
          type="button"
          className="w-full flex items-center space-x-3.5 text-[#9b9b9b] hover:bg-[#1c1c1c] hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group text-left"
        >
          <FiHeart className="w-5 h-5 text-[#888888] group-hover:text-white transition-colors duration-200" />
          <span className="text-sm">Watchlist</span>
        </button>

        {/* History mock placeholder layout element item */}
        <button
          type="button"
          className="w-full flex items-center space-x-3.5 text-[#9b9b9b] hover:bg-[#1c1c1c] hover:text-white px-3 py-3 rounded-xl font-medium transition duration-200 group text-left"
        >
          <FiClock className="w-5 h-5 text-[#888888] group-hover:text-white transition-colors duration-200" />
          <span className="text-sm">History</span>
        </button>
      </div>
    </div>
  );
};

export default HeroLeft;
