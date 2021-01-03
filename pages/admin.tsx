import { createStyles, makeStyles, Theme } from '@material-ui/core'
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
import { UserType } from '../utils/types'

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
    users: UserType[]
    families: [
        {
            _id: string
            user_type: IFamilyTypes
            name: string
        }
    ]
}

export const admin: React.FC<AdminProps> = ({ users, families }) => {
    const { loggedOut } = useUser()
    const classes = useStyles()

    const { data, mutate } = useSWR('/api/users', fetcher, {
        initialData: users,
    })

    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }
    }, [loggedOut])

    console.log(data)

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <AddNewUser mutate={mutate} families={families} />

                <UsersAdmin mutate={mutate} users={data} families={families} />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: any = {}

    const { db } = await connectToDB()
    props.families = await family.getFamilies(db)

    props.users = await user.getAllUsers(db)

    return { props: JSON.parse(JSON.stringify(props)) }
}

export default admin
