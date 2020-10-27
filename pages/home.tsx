import { GetServerSideProps } from 'next'
import React from 'react'
import useSWR from 'swr'

import NavBar from '../components/NavBar'
import Users from '../components/Users'
import fetch from '../lib/fetch'
import { Gender, IStatus } from '../models/User'

interface IuserResponse {
    success: boolean
    data: [
        {
            id: string
            firstName: string
            lastName: string
            email?: string
            family_id: string
            gender: Gender
            status: IStatus
            class_level: string
            joined_at: string
        }
    ]
}

interface IerrorResponse {
    success: boolean
    error: string
}

export const home = ({
    initialData,
}: {
    initialData: IuserResponse
}): React.ReactElement => {
    const { data, error } = useSWR<IuserResponse, IerrorResponse>(
        '/api/users',
        fetch,
        {
            initialData,
        }
    )

    console.log('data', data)
    console.log('error', error)

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
