import axios from 'axios'
//import { store } from '../../store'

// ideally there is a API url set in the .env
// but if not we can use a globally set one
// this is a hack around to prepare configuration in Wordpress
const API_URL = window.API_URL || process.env.VUE_APP_API_URL

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { plainAxiosInstance }
