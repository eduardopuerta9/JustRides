import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import Register from './components/Register'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'

import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)
  const [cards, setCards] = useState([])
  const [reviews, setReviews] = useState([])

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
