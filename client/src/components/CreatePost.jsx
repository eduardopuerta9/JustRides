import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import { CreatePost } from '../services/PostServices'

const MakePost = ({userInfo})=> {
  const userName = userInfo.userName
  const userId= userInfo.id

  let navigate= useNavigate()
  let initialState= {
    userId: userId,
    userName: userName,
    image: '',
    startLocation: '',
    endLocation: '',
    time: '',
    distance: '',
    message: ''
  }
  const [formValues, setFormValues]= useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await CreatePost({
      userId: userId,
      userName: userName,
      image: formValues.image,
      startLocation: formValues.startLocation,
      endLocation: formValues.endLocation,
      time: formValues.time,
      distance: formValues.distance,
      message: formValues.message
    })
    setFormValues(initialState)
    navigate ('/feed')
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value})
  }
  useEffect(()=> {

  }, [])

  return (
    <div className='create'>
      <h1>Make a post</h1>
      <form onSubmit={handleSubmit}>
        <h3>Hey {userName}</h3>
        <p>Create a post</p>

      </form>
    </div>
  )
}

export default MakePost