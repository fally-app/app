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
import React from 'react'

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
                                className={classes.blocks}
                            />
                            <TextField
                                label="passowrd"
                                type="password"
                                fullWidth
                                className={classes.blocks}
                            />
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth>
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
