import { GetServerSideProps } from 'next'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'

import NavBar from '../components/NavBar'
import Users from '../components/Users'
import fetcher from '../lib/fetch'
import { Gender, IStatus } from '../models/User'
import { addusers, loadUser } from '../store/slices/users'

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
    console.log(initialData)

    const { data } = useSWR<IuserResponse, IerrorResponse>(
        '/api/users',
        fetcher,
        {
            initialData,
        }
    )
    const dispatch = useDispatch()
    dispatch(loadUser())

    dispatch(addusers(data.data))

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
            initialData: JSON.parse(JSON.stringify(data)),
        },
    }
}
