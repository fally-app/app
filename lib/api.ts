import axios from 'axios'

const api = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('auth-token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

export default api
