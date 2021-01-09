import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

import AddNewFamily from '../components/AddNewFam'
import FamiliesAdmin from '../components/FamiliesAdmin'
import NavBar from '../components/NavBar'
import { family } from '../db'
import { connectToDB } from '../db/connect'
import fetcher from '../lib/fetch'
import useUser from '../lib/useUser'
import { IFamilyTypes } from '../models/Family'
import { IStatus } from '../models/User'

interface UserResponse {
    success: boolean
    data: [
        {
            _id: string
            user_type: IFamilyTypes
            name: string
            password: string
            code: string
            status: IStatus
        }
    ]
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
    families: UserResponse
}

export const admin: React.FC<AdminProps> = ({
    families,
}): React.ReactElement => {
    const { loggedOut } = useUser()
    const classes = useStyles()

    const { data, mutate } = useSWR('/api/family', fetcher, {
        initialData: families,
    })

    useEffect(() => {
        if (loggedOut) {
            Router.replace('/login')
        }
    }, [loggedOut])

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <AddNewFamily mutate={mutate} />
                <FamiliesAdmin mutate={mutate} families={data.data} />
            </div>
        </>
    )
}
export default admin

export const getServerSideProps: GetServerSideProps = async () => {
    const { db } = await connectToDB()
    const families = await family.getFamilies(db)

    return {
        props: {
            families: JSON.parse(JSON.stringify(families)),
        },
    }
}
