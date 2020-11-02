import axios from 'axios'

const userApi = {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    current: async () => {
        const token = localStorage.getItem('auth-token')
        try {
            const response = await axios.get('/api/family/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response
        } catch (error) {
            return error.response
        }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    login: async (code: string, password: string) => {
        try {
            const response = axios.post(
                `${process.env.SERVER_BASE_URL}/family/login`,
                { code, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            return response
        } catch (error) {
            return error.response
        }
    },
}

export default userApi
