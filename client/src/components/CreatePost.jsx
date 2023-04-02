import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { Helmet } from 'react-helmet';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { useMemo } from 'react';


const MakePost = ({ user})=> {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries:['places'],
  })
  const initialState= {
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

    await axios.post(`http://localhost:3001/post/create`, formValues)

    setFormState(initialState)
  }

  const handleChange = (e) => {
    setFormState({ ...formValues, [e.target.id]: e.target.value})
    console.log(formValues)
  }
  const [map, setMap]=useState(null)

  return (
    <div className="post-form-container">
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
                <Autocomplete>
                <input type="text" id='startLocation'  onChange={handleChange}
                value={formValues.startLocation} placeholder='Origin' ></input>
                </Autocomplete>

              </div>
            </div>
            <div className="form-group">
              <label htmlFor="endLocation" className='control-label'></label>
              <div className="col-xs-4">
                <Autocomplete>
                <input type="text" id='endLocation' onChange={handleChange}
              value={formValues.endLocation} placeholder='Destination'></input>

                </Autocomplete>
                </div>
            </div>
          </form>
          <div className="col-xs-offset-2 col-xs-10">
            <button className='button-destination'> BIKE</button>

          </div>
          <GoogleMap zoom={10} center={{lat:44, lng:-80}} mapContainerClassName="map-container"
          onLoad={(map)=> setMap(map)}
          ></GoogleMap>
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