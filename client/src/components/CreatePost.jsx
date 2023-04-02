import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { Helmet } from 'react-helmet';


const MakePost = ({userInfo})=> {
  const userName = userInfo.userName
  const userId= userInfo.id

  
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
      <Helmet>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBFOXlP99us1ZJDtOw33VJn8qkOcQR4_NY&libraries=places'></script>
        <script src='app.js'></script>
      </Helmet>
    <form onSubmit={handleSubmit} className="addPostForm"></form>
      <div className="post-div"></div>
      
      <div className='jumbotron'>
        <div className="container-fluid">
          <h1>Find The Distance Between Two Places</h1>
          <p>This App will help will help you calculate your traveling distance</p>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="startLocation" className='control-label'></label>
              <div className="col-xs-4">
                <input type="text" id='startLocation'  onChange={handleChange}
        value={formValues.startLocation} placeholder='Origin' ></input>

              </div>
            </div>
            <div className="form-group">
              <label htmlFor="endLocation" className='control-label'></label>
              <div className="col-xs-4">
                <input type="text" id='endLocation' onChange={handleChange}
        value={formValues.endLocation} placeholder='Destination'></input>
                </div>
            </div>
          </form>
          <div className="col-xs-offset-2 col-xs-10">
            <button className='button-destination'> BIKE</button>

          </div>
        </div>
        <div className="container-fluid">
          <div id="googleMap">

          </div>
          <div id="output">

          </div>
        </div>
      </div>
      <div className="post-div"></div>
      <label htmlFor="image">Image</label>
      <input
        type="text"
        id="image"
        onChange={handleChange}
        value={formValues.image}
        className="post-form-image"
      ></input>
      <label htmlFor="message">Caption</label>
      <input
        type="text"
        id="message"
        onChange={handleChange}
        value={formValues.message}
        className="post-form-Message"
      ></input>
      
      <button type="submit">Post</button>
  </div>
  )
}



export default MakePost