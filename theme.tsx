import red from '@material-ui/core/colors/red'
import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2f2f31',
        },
        secondary: {
            main: '#27286b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
})

export default theme
