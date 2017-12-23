import axios from 'axios'
import { localStorage } from '@/services/storage'

import Auth from './auth'
import PoisResource from './pois'
import TagsResource from './tags'

const client = axios.create({
  baseURL: process.env.API_SERVER_URL
})

client.defaults.headers.common['Content-Type'] = 'application/json'
client.defaults.headers.common['Accept'] = 'application/json'

const setAuthorization = token => {
  if (token) {
    client.defaults.headers.common['Authorization'] = `JWT ${token}`
  } else {
    delete client.defaults.headers.common['Authorization']
  }
}

const token = localStorage.get('authToken')
if (token) {
  setAuthorization(token)
}

export default {
  setAuthorization: setAuthorization,
  auth: Auth(client),
  pois: PoisResource(client),
  tags: TagsResource(client)
}
