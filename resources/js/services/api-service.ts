import axios from "axios";

// Gunakan VITE_ prefix untuk environment variables di frontend
export const BASE_URL = import.meta.env.VITE_APP_API_URL;
export const BASE_URL_STORAGE = import.meta.env.VITE_APP_STORAGE_URL;

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
            config.headers['X-CSRF-TOKEN'] = token;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);

export const isAxiosError = axios.isAxiosError;

export default apiClient;