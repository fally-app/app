import { createStyles, makeStyles, Theme } from '@material-ui/core'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

import AddNewUser from '../components/AddNewUser'
import NavBar from '../components/NavBar'
import UsersAdmin from '../components/UserAdmin'
import { connectToDB, family, user } from '../db'
import fetcher from '../lib/fetch'
import useUser from '../lib/useUser'
import { IFamilyTypes } from '../models/Family'
import { Gender, IStatus } from '../models/User'

interface UserResponse {
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

interface ErrorResponse {
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
            height: '100vh',
            flexDirection: 'column',
        },
    })
)

interface AdminProps {
    initialData: UserResponse
    families: [
        {
            _id: string
            user_type: IFamilyTypes
            name: string
        }
    ]
}

export function admin({
    initialData,
    families,
}: AdminProps): React.ReactElement {
    const { loggedOut } = useUser()
    const classes = useStyles()

    const { data, mutate } = useSWR<UserResponse, ErrorResponse>(
        '/api/users',
        fetcher,
        { initialData }
    )

    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }

        if (!data.data) {
            Router.replace('/login')
        }
    }, [loggedOut])

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <AddNewUser mutate={mutate} families={families} />

                <UsersAdmin
                    mutate={mutate}
                    users={data.data}
                    families={families}
                />
            </div>
        </>
    )
}
export default admin

export const getServerSideProps: GetServerSideProps = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: any = {}
    // const data = await axios.get(process.env.SERVER_BASE_URL + '/api/users')
    // const families = await axios.get(
    //     process.env.SERVER_BASE_URL + '/api/family'
    // )

    const { db } = await connectToDB()
    const families = await family.getFamilies(db)

    props.families = families

    const users = await user.getAllUsers(db)
    props.users = users

    console.log(users)

    return { props }
}
