import Route from 'next/router'
import { useState } from 'react'

// import { useState } from 'react'

enum IStatus {
    ACTIVE = 'ACTIVE',
    DIACTIVE = 'DIACTIVE',
}

interface IFamily {
    code: string
    name: string
    password: string
    created_at: string
    user_type: userType
    status: IStatus
}

enum userType {
    ADMIN = 'ADMIN',
    FAMILY = 'FAMILY',
    GUEST = 'GUEST',
}

interface IuserResp {
    success: boolean
    data: IFamily
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useUser() {
    const [user, setuser] = useState<IFamily>()

    function getUser() {
        return user
    }

    async function fetchUser() {
        const token = localStorage.getItem('auth-token')
        try {
            const me = await fetch('/api/family/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data: IuserResp = await me.json()
            setuser({ ...user, ...data.data })
        } catch (error) {
            console.log(error)
        }
    }

    function getUserType() {
        return user.user_type
    }

    function route() {
        if (user) {
            if (user.user_type === userType.ADMIN) {
                Route.push('/admin')
            } else if (user.user_type === userType.FAMILY) {
                Route.push('/home')
            }
        } else {
            Route.push('/login')
        }
    }

    function setToken(token: string) {
        localStorage.setItem('auth-token', token)
    }

    function logout() {
        localStorage.removeItem('auth-token')
        route()
    }

    return { route, logout, getUser, getUserType, setToken, fetchUser }
}

export default useUser
