import axios from 'axios'

const request = {
  ApplicationId: 'f5c9f21d-0ecf-4da3-bc52-6e1894e9b62c',
  ApplicationSecret: '0841d668-eccf-42ac-8216-c876c8e906d7',
  Token: 'c5db03703da3c7a0dc02e6ce0c87ede0'
}

const tokenClient = axios.create({
  baseURL: 'https://api.linnworks.net',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json, text/javascript, */*; q=0.01'
  }
})

const querystring = require('querystring')

export default {
  getAuthToken() {
    return tokenClient.post(
      '/api/Auth/AuthorizeByApplication',
      querystring.stringify(request)
    )
  }
}
