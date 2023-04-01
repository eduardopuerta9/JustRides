import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const MakePost = ({userInfo})=> {
  const userName = userInfo.userName
  const userId= userInfo.id

  let navigate= useNavigate()
  const initialState= {
    userId: userId,
    userName: userName,
    image: '',
    startLocation: '',
    endLocation: '',
    time: '',
    distance: '',
    message: ''
  }
  const [formValues, setFormState]= useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:3001/api/post/create', formValues)

    setFormState(initialState)
  }

  const handleChange = (e) => {
    setFormState({ ...formValues, [e.target.id]: e.target.value})
    console.log(formValues)
  }

  return (
    <div className="post-form-container">
    <form onSubmit={handleSubmit} className="addPostForm">
      <div className="post-div"></div>
      <label htmlFor="image">Image</label>
      <input
        type="text"
        id="image"
        onChange={handleChange}
        value={formValues.image}
        className="post-form-image"
      ></input>
      <div className="start-location-div"></div>
      <label htmlFor="startLocation">Starting Location</label>
      <input
        type="text"
        id="startLocation"
        onChange={handleChange}
        value={formValues.startLocation}
        className="post-form-startLocation"
      ></input>
      <div className="end-location-div"></div>
      <label htmlFor="endLocation">Ending Location</label>
      <input
        type="text"
        id="endLocation"
        onChange={handleChange}
        value={formValues.endLocation}
        className="post-form-endLocation"
      ></input>
      <div className="time-div"></div>
      <label htmlFor="time">Time</label>
      <input
        type="text"
        id="time"
        onChange={handleChange}
        value={formValues.time}
        className="post-form-time"
      ></input>
      <div className="distance-div"></div>
      <label htmlFor="distance">Distance</label>
      <input
        type="text"
        id="distance"
        onChange={handleChange}
        value={formValues.distance}
        className="post-form-distance"
      ></input>
      <div className="message-div"></div>
      <label htmlFor="message">Caption</label>
      <input
        type="text"
        id="message"
        onChange={handleChange}
        value={formValues.message}
        className="post-form-Message"
      ></input>
      
      <button type="submit">Post</button>
    </form>
  </div>
  )
}

export default MakePost