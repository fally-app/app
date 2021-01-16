import { makeStyles } from '@material-ui/core'
import dynamic from 'next/dynamic'
import React from 'react'

import NavBar from '../components/NavBar'
import useRequest from '../lib/useRequest'
import { ErrorResponse, UserResponse } from './home'

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        flexDirection: 'column',
    },
})

const MakeAttendance = dynamic(() => import('../components/MakeAttendance'), {
    ssr: false,
})

export const attendance: React.FC = (): React.ReactElement => {
    const classes = useStyles()

    let token
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('auth-token')
    }

    const { data: users } = useRequest<UserResponse, ErrorResponse>({
        url: '/api/family/getUsersInFamily',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    console.log('Attendance', users)

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <MakeAttendance users={users?.data} />
            </div>
        </>
    )
}
export default attendance
