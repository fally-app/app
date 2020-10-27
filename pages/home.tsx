import { GetServerSideProps } from 'next'
import React from 'react'
import useSWR from 'swr'

import NavBar from '../components/NavBar'
import Users from '../components/Users'
import fetch from '../lib/fetch'
import { IUser } from '../store/types/userTypes'

export const home = ({ initialData }): React.ReactElement => {
    const {
        data: { data: IUser },
        error,
    } = useSWR('/api/users', fetch, { initialData })

    return (
        <>
            <NavBar />
            <Users />
        </>
    )
}

export default home

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetch('http://localhost:3000/api/users')

    return {
        props: {
            initialData: data,
        },
    }
}
