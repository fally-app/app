import Router from 'next/router'
import { useEffect } from 'react'

import NavBar from '../components/NavBar'
import useUser from '../lib/useUser'

export const admin = (): React.ReactElement => {
    const { loggedOut } = useUser()

    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }
    }, [loggedOut])

    return (
        <>
            <NavBar />
            <h1>Admin here</h1>
        </>
    )
}
export default admin
