import {
    Button,
    Card,
    CardContent,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import api from '../lib/api'
import useUser from '../lib/useUser'

const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
    },
    blocks: {
        marginBottom: 25,
    },
    header: {
        textAlign: 'center',
    },
})

export const login = (): React.ReactElement => {
    const classes = useStyles()

    const [code, setCode] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [isSnackOpen, setisSnackOpen] = useState<boolean>(false)
    const { user, mutate } = useUser()

    useEffect(() => {
        if (user) {
            if (user?.user_type === 'ADMIN') {
                Router.replace('/admin')
            } else if (user?.user_type === 'FAMILY') {
                Router.replace('/home')
            }
        }
    }, [user])

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    const handleLogin = async () => {
        try {
            const result = await api.post('/api/family/login', {
                code,
                password,
            })
            localStorage.setItem('auth-token', result.data.data)
            mutate()
        } catch (error) {
            if (error.response) {
                setErrorMsg(error.response.data.error)
            } else {
                setErrorMsg('Some thing went wrong')
            }
            setisSnackOpen(true)
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setisSnackOpen(false)
    }

    return (
        <>
            <Head>
                <title>Login - Sda</title>
            </Head>
            <Snackbar
                open={isSnackOpen}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Grid
                container
                direction="column"
                justify="center"
                className={classes.root}
                alignItems="center">
                <Card>
                    <CardContent>
                        <Typography
                            variant="h4"
                            component="h2"
                            className={classes.header}>
                            Login
                        </Typography>

                        <form>
                            <TextField
                                label="code"
                                fullWidth
                                type="text"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                className={classes.blocks}
                            />
                            <TextField
                                label="password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={classes.blocks}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                onClick={handleLogin}>
                                Login here
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}
export default login
