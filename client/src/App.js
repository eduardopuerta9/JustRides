import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Feed from './components/Feed'
import Nav from './components/Nav'
import MakePost from './components/CreatePost'
import { Routes, Route } from 'react-router-dom'

import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)
  const [userInfo, setUserInfo] = useState({})
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
      <Nav user={user} handleLogout={handleLogout} checkToken={checkToken} />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="feed" element={<Feed user={user} />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route
            path="/createpost"
            element={<MakePost userInfo={userInfo} />}
          ></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
