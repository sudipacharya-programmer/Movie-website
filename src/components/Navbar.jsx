import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MoviesDataContext } from "../contexts/MoviesContext";
import { useContext } from "react";

const Navbar = () => {
  const [IsMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { setSearchQuery, setActiveCategory } = useContext(MoviesDataContext);

  const handleStartWatching = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setIsMobileMenuOpen(false);
    navigate("/");
  };
  return (
    /* border, background ra mobile menu shadow ma dark state thapिएको छ */
    <nav className="relative flex items-center justify-between bg-white px-8 py-4 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      
      {/* Text black bata dark mode ma white hunxa */}
      <div className="text-2xl font-bold tracking-tight text-black dark:text-white">
        iFrame<span className="text-emerald-400">.</span>
      </div>



      <div className="flex items-center space-x-6 text-sm font-medium">
        {/* Sign In text ko lagi dark responsive classes */}
        {user ? (
          <>
            <span className="hidden text-gray-600 dark:text-gray-400 sm:inline">
              Hi, {user.name}
            </span>
            <button
              type="button"
              onClick={() => setIsLogoutPopupOpen(true)}
              className="text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            Login
          </Link>
        )}
        
        {/* Button layout light code mai ramro dekhinxa, so background normal rakhiyeko xa */}
        <button
          type="button"
          onClick={handleStartWatching}
          className="bg-[#8ee1c3] text-black font-semibold px-5 py-2.5 rounded hover:bg-[#7cd0b2] transition"
        >
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

      {isLogoutPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="presentation"
          onClick={() => setIsLogoutPopupOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-neutral-700 bg-[#181818] p-6 text-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="logout-popup-title" className="text-lg font-bold">
              Do you want to logout?
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              You can log in again at any time.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutPopupOpen(false)}
                className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsLogoutPopupOpen(false);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
