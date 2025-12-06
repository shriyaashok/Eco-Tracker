// Axios wrapper to call backend API
// TODO: add auth headers, error handling, and typed responses

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  timeout: 10000,
});

export default api;
