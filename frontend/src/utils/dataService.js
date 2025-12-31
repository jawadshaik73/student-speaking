import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding loading states or auth tokens
api.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.error || 'Server error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred.');
    }
  }
);

export const fetchAssessmentData = async () => {
  try {
    const data = await api.get('/assessment');
    return data;
  } catch (error) {
    console.error('Error fetching assessment data:', error);
    throw error;
  }
};

export const updateScores = async (scores) => {
  try {
    const data = await api.post('/update-scores', { scores });
    return data.data;
  } catch (error) {
    console.error('Error updating scores:', error);
    throw error;
  }
};

export const resetScores = async () => {
  try {
    const data = await api.post('/reset-scores');
    return data.data;
  } catch (error) {
    console.error('Error resetting scores:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const data = await api.get('/health');
    return data;
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
};