import React from 'react'
import HeroLeft from './HeroLeft'
import Right from './Right'

const Hero = () => {
  return (
    <div className='bg-blue-50 h-[calc(100vh-73px)] flex'>
      <HeroLeft/>
      <Right/>
    </div>
  )
}

export default Hero