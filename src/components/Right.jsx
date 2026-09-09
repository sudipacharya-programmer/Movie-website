import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // 💡 1. Added useLocation hook
import HeroRight from './HeroRight';
import Footer from './Footer';
import AllMovies from './AllMovies';
import MovieDetail from './MovieDetail'; 
import Watchlist from './Watchlist';
import { MoviesDataContext } from '../contexts/MoviesContext';

const Right = () => {
  const { searchQuery, activeCategory } = useContext(MoviesDataContext);
  
  // 💡 2. Initialize location hook to monitor active browser routing path changes
  const location = useLocation();

  return (
    <div className='w-full h-[calc(100vh-73px)] overflow-y-auto custom-scrollbar'>
      
      
      <Routes location={location}>
      
        <Route 
          path="/" 
          element={
            <>
              {/* Main Banner displays only when search query is empty and active category is home ('all') */}
              {searchQuery === '' && activeCategory === 'all' && <HeroRight />}
              <AllMovies />
              <Footer />
            </>
          } 
        />

        {/* Premium Movie Details & Player Screen Path Component */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>

    </div>
  );
};

export default Right;
