import {
    createStyles,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Snackbar from '@material-ui/core/Snackbar'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import TextField from '@material-ui/core/TextField'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import axios from 'axios'
import React from 'react'

interface AddNewUserProps {
    mutate: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectBox: {
            marginTop: theme.spacing(2),
        },
    })
)

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const FormDialog: React.FC<AddNewUserProps> = ({
    mutate,
}): React.ReactElement => {
    const [openModal, setOpenModal] = React.useState(false)
    const [type, setType] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [isSnackOpen, setSnackOpen] = React.useState<boolean>(false)
    const [erorr, setError] = React.useState<string>('')

    const classes = useStyles()

    const handleClickOpen = () => {
        setOpenModal(true)
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as string)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    async function handleAddNewUser() {
        const data = {
            user_type: type,
            name,
            password,
        }
        try {
            await axios.post('/api/family', data)
            mutate()
            setType('')
            setName('')
            setPassword('')
            handleClose()
        } catch (error) {
            setSnackOpen(true)
            setError(error.response.data.error)
        }
    }

    return (
        <div style={{ position: 'absolute', right: '1rem', top: '6rem' }}>
            <Snackbar
                open={isSnackOpen}
                autoHideDuration={3000}
                onClose={() => setSnackOpen(prev => !prev)}>
                <Alert
                    onClose={() => setSnackOpen(prev => !prev)}
                    severity="error">
                    {erorr}
                </Alert>
            </Snackbar>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}>
                add new family
            </Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Create new family
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="password"
                        label="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                    />

                    <div className={classes.selectBox}>
                        <InputLabel id="label">Type</InputLabel>
                        <Select
                            labelId="label"
                            id="select"
                            fullWidth
                            value={type}
                            onChange={handleChange}>
                            <MenuItem value="FAMILY">FAMILY</MenuItem>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                        </Select>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        close
                    </Button>
                    <Button onClick={handleAddNewUser} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormDialog
