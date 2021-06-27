import useRequest from './useRequest'

export default function useUser() {
    let token
    if (typeof window != 'undefined') {
        token = localStorage.getItem('auth-token')
    }

    const { data, mutate, error } = useRequest({
        url: '/api/family/me',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const loading = !data && !error
    const loggedOut = error && error.name

    return {
        loading,
        loggedOut,
        user: (<any>data)?.data,
        mutate,
    }
}
