import { Button, Grid, TextField } from '@material-ui/core'
import React from 'react'

export const login = (): React.ReactElement => {
    return (
        <div>
            <Grid
                container
                alignContent="center"
                direction="column"
                style={{ minHeight: '100vh', minWidth: '100vw' }}>
                <TextField label="username" />
                <TextField label="passowrd" />
                <Button color="primary" variant="contained">
                    Login here
                </Button>
            </Grid>
        </div>
    )
}
export default login
