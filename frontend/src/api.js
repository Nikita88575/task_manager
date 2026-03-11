// frontend/src/api.js
import axios from 'axios';

// Базовый URL до нашего Django
const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

// Перехватчик ЗАПРОСОВ: достаем токен из памяти браузера
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Перехватчик ОТВЕТОВ: ловим протухший токен
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Если бекенд вернул 401 и мы еще не пытались обновить токен
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh');

            if (refreshToken) {
                try {
                    // Пробуем обновить
                    const res = await axios.post('http://localhost:8000/api/auth/jwt/refresh/', {
                        refresh: refreshToken
                    });
                    
                    localStorage.setItem('access', res.data.access);
                    originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                    
                    // Повторяем запрос с новым токеном
                    return api(originalRequest);
                } catch (err) {
                    // Если refresh тоже протух - выкидываем юзера
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    window.location.href = '/'; // На страницу логина
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;