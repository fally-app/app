import { Button, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect } from 'react'

import useUser from '../lib/useUser'

const App: React.FC = (): React.ReactElement => {
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            if (user?.user_type === 'ADMIN') {
                Router.replace('/admin')
            } else if (user?.user_type === 'FAMILY') {
                Router.replace('/home')
            }
        }
    }, [user])

    return (
        <>
            <Head>
                <title>SDA - Sabbath School</title>
            </Head>

            <div
                style={{
                    backgroundImage: `url('/bg.jpg')`,
                    width: `100vw`,
                    height: '100vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography
                    variant="h2"
                    style={{ marginBottom: '2rem', color: '#fff' }}>
                    Welcome to the app
                </Typography>
                <Link href="/login" passHref>
                    <Button variant="contained" color="primary">
                        Login here
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default App
