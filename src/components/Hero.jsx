import React from 'react';
import HeroLeft from './HeroLeft';
import Right from './Right';

const Hero = () => {
  return (
    // 💡 Main Fix: Changed bg to match our dark theme and removed flex height constraints
    <div className='bg-[#111111] h-[calc(100vh-73px)] flex w-full overflow-hidden text-white'>
      {/* Static left sidebar container navigation panel */}
      <HeroLeft />
      
      {/* Dynamic right view dashboard container containing router nodes */}
      <Right />
    </div>
  );
};

export default Hero;
