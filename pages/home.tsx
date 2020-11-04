import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import { useEffect } from 'react'

import AddNewUser from '../components/AddnewUser'
import NavBar from '../components/NavBar'
import Users from '../components/Users'
import useRequest from '../lib/useRequest'
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
            flexDirection: 'column',
        },
        devider: {
            marginBottom: '2rem',
            marginTop: '2%',
        },
    })
)

export const home = (): React.ReactElement => {
    let token
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('auth-token')
    }

    const { data: users } = useRequest<IuserResponse, IerrorResponse>({
        url: '/api/family/current',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const classes = useStyles()

    const { loggedOut } = useUser()

    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }
    }, [loggedOut])

    return (
        <>
            <Head>
                <title>Welcome</title>
            </Head>
            <NavBar />
            <div className={classes.wrapper}>
                <div className={classes.devider}>
                    <AddNewUser />
                </div>
                {!users ? (
                    <div>loading</div>
                ) : users.data.length <= 0 ? (
                    <div>No user added yet in your family</div>
                ) : (
                    <Users users={users.data} />
                )}
            </div>
        </>
    )
}
export default home
