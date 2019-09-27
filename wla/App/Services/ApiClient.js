import axios from 'axios'

export const apiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: 'http://localhost:500/api/v1/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})
