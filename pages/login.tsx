import api from '@/lib/api'
import useUser from '@/lib/useUser'
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    createStyles,
    Grid,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100vw',
            height: '100vh',
        },
        blocks: {
            marginBottom: 25,
        },
        header: {
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'capitalize',
        },
        headerLogo: {
            textAlign: 'center',
            paddingTop: '1rem',
            width: '35rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textTransform: 'capitalize',
        },
        buttonProgress: {
            color: blue[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
            width: '100%',
        },
    })
)

export const login = (): React.ReactElement => {
    const classes = useStyles()

    const [code, setCode] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

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
        setLoading(true)
        try {
            const result = await api.post('/api/family/login', {
                code,
                password,
            })
            console.log({ result })
            localStorage.setItem('auth-token', result.data.data)
            mutate()
            setLoading(false)
        } catch (error) {
            if (error.response) {
                setErrorMsg(error.response.data.error)
            } else {
                setErrorMsg('Some thing went wrong')
            }
            console.log({ error })
            setLoading(false)
            setIsSnackOpen(true)
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setIsSnackOpen(false)
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
                    <Link href="/">
                        <Typography
                            variant="h4"
                            component="h2"
                            className={classes.headerLogo}>
                            RCA-SDA
                        </Typography>
                    </Link>

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
                            <div className={classes.wrapper}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading}
                                    onClick={handleLogin}>
                                    Login here
                                </Button>
                                {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.buttonProgress}
                                    />
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}
export default login
