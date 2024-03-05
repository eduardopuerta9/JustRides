import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_SERVERURL}`

const Client = axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
export default Client
