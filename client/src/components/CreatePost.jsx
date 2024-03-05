import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../App.css'
import '../styles/createpost.css'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useJsApiLoader
} from '@react-google-maps/api'
import { useMemo } from 'react'

const MakePost = ({ user }) => {
  let navigate = useNavigate()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })
  const initialState = {
    userName: user.userName,

    image: '',
    startLocation: '',
    endLocation: '',
    time: '',
    distance: '',
    message: ''
  }
  const [formValues, setFormState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post(
      `${process.env.REACT_APP_SERVERURL}/post/create/${user.id}`,
      formValues
    )

    setFormState(initialState)
    navigate('/feed')
  }

  const handleChange = (e) => {
    setFormState({ ...formValues, [e.target.id]: e.target.value })
  }
  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const originRef = useRef()
  const destinationRef = useRef()

  if (
    directionsResponse != null &&
    formValues.time === '' &&
    formValues.distance === ''
  ) {
    setFormState({ ...formValues, time: duration, distance: distance })
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.BICYCLING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit} className="addPostForm"></form>
      <div className="post-div"></div>

      <div className="jumbotron">
        <div className="container-fluid">
          <h1>Share Your Ride!</h1>

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
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="startLocation" className="control-label"></label>
              <div className="col-xs-4">
                <Autocomplete>
                  <input
                    type="text"
                    id="startLocation"
                    onChange={handleChange}
                    value={formValues.startLocation}
                    placeholder="Origin"
                    ref={originRef}
                  ></input>
                </Autocomplete>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="endLocation" className="control-label"></label>
              <div className="col-xs-4">
                <Autocomplete>
                  <input
                    type="text"
                    id="endLocation"
                    onChange={handleChange}
                    value={formValues.endLocation}
                    placeholder="Destination"
                    ref={destinationRef}
                  ></input>
                </Autocomplete>
              </div>
            </div>
          </form>
          <div className="col-xs-offset-2 col-xs-10">
            <button
              className="button-destination"
              type="submit"
              onClick={calculateRoute}
            >
              {' '}
              CALCULATE
            </button>
          </div>
          <GoogleMap
            zoom={10}
            center={{ lat: 44, lng: -80 }}
            mapContainerClassName="map-container"
            onLoad={(map) => setMap(map)}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
        <div>
          <h3>Distance: {distance}</h3>
          <h3>Duration: {duration}</h3>
        </div>
      </div>
      <div className="col-xs-offset-2 col-xs-10">
        <button type="submit" onClick={handleSubmit}>
          SHARE
        </button>
      </div>
    </div>
  )
}

export default MakePost
