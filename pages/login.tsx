import {
    Button,
    Card,
    CardContent,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core'
import Head from 'next/head'
import React, { useState } from 'react'

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

    const handleLogin = () => {
        if (!code || !password) {
            console.log('something went wrong')
        }
        console.log(code, password)
    }

    return (
        <>
            <Head>
                <title>LOGIN - SABBATH SCHOOL</title>
            </Head>
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
                                label="passowrd"
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
