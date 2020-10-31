import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { GetServerSideProps } from 'next'
import React from 'react'
import useSWR from 'swr'

import NavBar from '../components/NavBar'
import Users from '../components/Users'
import fetcher from '../lib/fetch'
import { Gender, IStatus } from '../models/User'

interface IuserResponse {
    success: boolean
    data: [
        {
            _id: string
            firstName: string
            lastName: string
            email?: string
            family_id: string
            gender?: Gender
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
        },
    })
)

export const home = ({
    initialData,
}: {
    initialData: IuserResponse
}): React.ReactElement => {
    const { data } = useSWR<IuserResponse, IerrorResponse>(
        '/api/users',
        fetcher,
        {
            initialData,
        }
    )

    const classes = useStyles()

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <Users users={data.data} />
            </div>
        </>
    )
}
export default home

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetcher('http://localhost:3000/api/users')

    return {
        props: {
            initialData: JSON.parse(JSON.stringify(data)),
        },
    }
}
