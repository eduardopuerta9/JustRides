import './App.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Feed from './components/Feed'
import Nav from './components/Nav'
import { GetPosts } from './services/PostServices'
import MakePost from './components/CreatePost'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null)
  const [post, setPosts] = useState([])

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }
  const checkToken = async () => {
    const user = await CheckSession()
    console.log(user)
    setUser(user)
  }
  const handlePosts = async () => {
    const data = await GetPosts()
    setPosts(data)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    handlePosts()
  }, [])

  return (
    <div className="App">
      <Nav user={user} handleLogout={handleLogout} checkToken={checkToken} />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/feed" element={<Feed user={user} post={post} />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route path="/post/create" element={<MakePost user={user} />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
