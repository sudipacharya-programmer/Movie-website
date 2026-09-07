import React from 'react'
import HeroRight from './HeroRight'
import Footer from './Footer'
import AllMovies from './AllMovies'

const Right = () => {
  return (
    <div className='w-full  h-[calc(100vh-73px)] overflow-y-auto custom-scrollbar'>
      <HeroRight/>
      <AllMovies/>
      <Footer/>
    </div>
  )
}

export default Right