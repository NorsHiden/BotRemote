import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Servers from './Servers'


const App = () => {
  return (
    <>
    <Routes>
    <Route path='/home*' element={<Servers />}/>
		<Route path='/' element={<LandingPage />}/>
    </Routes>
    </>
  )
}

export default App
