import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'

import NavBar from '../components/NavBar'
import fetcher from '../lib/fetch'
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
        </>
    )
}
export default admin

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetcher('http://localhost:3000/api/users')

    return {
        props: {
            initialData: JSON.parse(JSON.stringify(data)),
        },
    }
}
