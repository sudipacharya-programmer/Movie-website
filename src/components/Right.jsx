import React,{useContext} from 'react'
import HeroRight from './HeroRight'
import Footer from './Footer'
import AllMovies from './AllMovies'
import { MoviesDataContext } from '../contexts/MoviesContext'


const Right = () => {
  const { searchQuery,activeCategory } = useContext(MoviesDataContext);

  return (
    
    <div className='w-full  h-[calc(100vh-73px)] overflow-y-auto custom-scrollbar'>
      
        {searchQuery=='' && activeCategory=='all' && <HeroRight />}
      <AllMovies/>
      <Footer/>
    </div>
  )
}

export default Right