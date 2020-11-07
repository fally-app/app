import { createStyles, makeStyles, Theme } from '@material-ui/core'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

import NavBar from '../components/NavBar'
import UsersAdmin from '../components/UserAdmin'
import fetcher from '../lib/fetch'
import useUser from '../lib/useUser'
import { Gender, IStatus } from '../models/User'

interface IuserResponse {
    success: boolean
    data: [
        {
            _id: string
            firstName: string
            lastName: string
            email?: string
            family_id: {
                _id: string
                name: string
            }
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

export const admin = ({
    initialData,
}: {
    initialData: IuserResponse
}): React.ReactElement => {
    const { loggedOut } = useUser()
    const classes = useStyles()

    const { data } = useSWR<IuserResponse, IerrorResponse>(
        '/api/users',
        fetcher,
        { initialData }
    )

    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }
    }, [loggedOut])

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <UsersAdmin users={data.data} />
            </div>
        </>
    )
}
export default admin

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await axios.get(process.env.SERVER_BASE_URL + '/api/users')

    return {
        props: {
            initialData: data.data,
        },
    }
}
