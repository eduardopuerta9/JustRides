import Axios from 'axios'

const BASE_URL = `https://just-rides-app-api.onrender.com/api`

const Client = Axios.create({ baseURL: BASE_URL })

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
