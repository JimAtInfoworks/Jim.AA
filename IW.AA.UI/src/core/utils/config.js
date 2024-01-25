const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:5012' // Replace with production url
  : 'http://localhost:5012'

export const Config = {
  apiUrl: API_BASE_URL
}