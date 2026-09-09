import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Auth from './components/Auth'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<Hero />} />
      </Routes>
    </div>
  )
}

export default App