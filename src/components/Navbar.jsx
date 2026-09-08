import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [IsMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    /* border, background ra mobile menu shadow ma dark state thapिएको छ */
    <nav className="relative flex items-center justify-between bg-white px-8 py-4 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      
      {/* Text black bata dark mode ma white hunxa */}
      <div className="text-2xl font-bold tracking-tight text-black dark:text-white">
        iFrame<span className="text-emerald-400">.</span>
      </div>

      {/* Desktop Links: gray-600 bata dark mode ma gray-400 ra hover text white hunxa */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-400">
        <a href="#" className="hover:text-black dark:hover:text-white transition">
          Browse
        </a>
        <a href="#" className="hover:text-black dark:hover:text-white transition">
          Collections
        </a>
        <a href="#" className="hover:text-black dark:hover:text-white transition">
          The Note
        </a>
      </div>

      <div className="flex items-center space-x-6 text-sm font-medium">
        {/* Sign In text ko lagi dark responsive classes */}
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
          Sign In
        </a>
        
        {/* Button layout light code mai ramro dekhinxa, so background normal rakhiyeko xa */}
        <button className="bg-[#8ee1c3] text-black font-semibold px-5 py-2.5 rounded hover:bg-[#7cd0b2] transition">
          Start watching
        </button>
        
        {/* Hamburger Icon color adjustment */}
        <button
          onClick={() => setIsMobileMenuOpen(!IsMobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
        >
          {IsMobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* ३. मोबाइल मेनु: background, border, text ra hover colors dark adapt gariyeko xa */}
      {IsMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 flex flex-col space-y-4 md:hidden z-50 shadow-lg dark:shadow-black/40">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition font-medium text-base">
              Browse
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition font-medium text-base">
              Collections
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition font-medium text-base">
              The Note
            </a>
          </div>
        )}
    </nav>
  );
};

export default Navbar;
