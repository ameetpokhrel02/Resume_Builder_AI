
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration and network/server errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Token expired or invalid
      if (error.response.status === 401) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
      }
      // Optionally, handle 403 or other errors
    } else if (error.request) {
      // Network/server error
      alert('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
