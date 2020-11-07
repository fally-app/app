import { createStyles, makeStyles, Theme } from '@material-ui/core'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

import AddNewUser from '../components/AddnewUser'
import NavBar from '../components/NavBar'
import UsersAdmin from '../components/UserAdmin'
import fetcher from '../lib/fetch'
import useUser from '../lib/useUser'
import { IFamilyTypes } from '../models/Family'
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
            height: '100vh',
            flexDirection: 'column',
        },
    })
)

interface AdminProps {
    initialData: IuserResponse
    families: {
        success: true
        data: [
            {
                _id: string
                user_type: IFamilyTypes
                name: string
            }
        ]
    }
}

export const admin: React.FC<AdminProps> = ({
    initialData,
    families,
}): React.ReactElement => {
    const { loggedOut } = useUser()
    const classes = useStyles()

    const { data, mutate } = useSWR<IuserResponse, IerrorResponse>(
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
                <AddNewUser mutate={mutate} families={families.data} />

                <UsersAdmin
                    mutate={mutate}
                    users={data.data}
                    families={families.data}
                />
            </div>
        </>
    )
}
export default admin

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await axios.get(process.env.SERVER_BASE_URL + '/api/users')
    const families = await axios.get(
        process.env.SERVER_BASE_URL + '/api/family'
    )

    return {
        props: {
            families: families.data,
            initialData: data.data,
        },
    }
}
