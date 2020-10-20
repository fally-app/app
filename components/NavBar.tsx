import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/menu'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
)

export const NavBar = (): React.ReactElement => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        arial-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        App
                    </Typography>
                    <Button color="ínherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar
