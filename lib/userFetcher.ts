import Axios from 'axios'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async () => {
    const token = localStorage.getItem('aut-token')

    if (token) {
        try {
            const getUser = await Axios.get('/api/family/me', {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            })
            return getUser
        } catch (error) {
            throw new Error(error)
        }
    } else {
        const error = new Error('Not authorized!')
        throw error
    }
}
