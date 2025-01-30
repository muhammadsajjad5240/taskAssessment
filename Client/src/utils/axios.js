import Axios from 'axios';

let config = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 4000,
    headers: { 'X-Custom-Header': 'Vohnt' },
};

const api = Axios.create(config);

api.interceptors.request.use((existingConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
        existingConfig.headers.Authorization = 'Bearer ' + token;
    }
    return existingConfig;
});

export default api;