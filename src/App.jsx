import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import GamePage from './Pages/GamePage/GamePage'
import HistoryPage from './Pages/HistoryPage/HistoryPage'
import Footer from './Components/Footer/Footer'

const App = () => {
  const BASE_URL = 'http://localhost:8000/api'
  return (
   
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<GamePage BASE_URL={BASE_URL} />} />
          <Route path='/history' element={<HistoryPage BASE_URL={BASE_URL} />} />
        </Routes>
        <Footer />
      </Router>
 
  )
}

export default App