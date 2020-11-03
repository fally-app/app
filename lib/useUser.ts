import useRequest from './useRequest'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: (<any>data)?.data,
        mutate,
    }
}
