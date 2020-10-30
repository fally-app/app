import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { GetServerSideProps } from 'next'
import React from 'react'
import { useDispatch } from 'react-redux'
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
    // const { data } = useSWR<IuserResponse, IerrorResponse>(
    //     '/api/users',
    //     fetcher,
    //     {
    //         initialData,
    //     }
    // )

    const classes = useStyles()

    // const dispatch = useDispatch()
    // dispatch(loadUser())

    // console.log(data.data)

    // dispatch(addusers(data.data))

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <Users />
            </div>
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
