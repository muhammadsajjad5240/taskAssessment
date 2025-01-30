import { useMemo } from 'react';
import Axios from 'axios';

const useAxios = () => {
  return useMemo(() => {
    const axiosInstance = Axios.create({
      baseURL: import.meta.env.VITE_BASE_URL, // Ensure this is set in your .env file
      timeout: 4000,
      headers: { 'X-Custom-Header': 'Vohnt' },
    });

    // Add a request interceptor
    axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return axiosInstance;
  }, []);
};

export default useAxios;
