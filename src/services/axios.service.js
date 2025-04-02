// src/services/axios.service.js

import axios from 'axios';

// Create an instance of Axios with a base URL and default headers
const privateAxios = axios.create({
  baseURL: 'https://your-api-url.com/api/', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors for request and response here if needed
privateAxios.interceptors.request.use(
  (config) => {
    // Perform actions before request is sent, like adding tokens
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (response) => {
    // Modify the response if needed
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { privateAxios };
