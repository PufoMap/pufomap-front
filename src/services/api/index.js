import axios from 'axios'
import { localStorage } from '@/services/storage'

import PoisResource from './pois'

const client = axios.create({
  baseURL: process.env.API_SERVER_URL
})

client.defaults.headers.common['Content-Type'] = 'application/json'
client.defaults.headers.common['Accept'] = 'application/json'

const setAuthorization = token => {
  client.defaults.headers.common['Authorization'] = `JWT ${token}`
}

const token = localStorage.get('authToken')
if (token) {
  setAuthorization(token)
}

export default {
  pois: PoisResource(client)
}
