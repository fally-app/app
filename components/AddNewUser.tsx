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

import { IFamilyTypes } from '../models/Family'

interface AddNewUserProps {
    families: [
        {
            _id: string
            user_type: IFamilyTypes
            name: string
        }
    ]
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
    families,
    mutate,
}): React.ReactElement => {
    const [openModal, setOpenModal] = React.useState(false)
    const [gender, setGender] = React.useState('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [className, setClassName] = React.useState<string>('')
    const [family, setFamily] = React.useState<string>()
    const [isSnackOpen, setSnackOpen] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>('')

    const classes = useStyles()

    const familyArray = families.filter(fam => fam.user_type != 'ADMIN')

    const handleClickOpen = () => {
        setOpenModal(true)
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGender(event.target.value as string)
    }

    const handleFamilySelect = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setFamily(event.target.value as string)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    async function handleAddNewUser() {
        const data = {
            firstName,
            lastName,
            gender,
            family_id: family,
            class_level: className,
        }
        try {
            await axios.post('/api/users', data)
            mutate()
            setGender('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setClassName('')
            setFamily('')
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
                    {error}
                </Alert>
            </Snackbar>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}>
                add new user
            </Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Create new user
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="firstname"
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="lastname"
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="class_name"
                        label="Class Name"
                        type="text"
                        fullWidth
                        value={className}
                        onChange={e => setClassName(e.target.value)}
                    />

                    <div className={classes.selectBox}>
                        <InputLabel id="label">Gender</InputLabel>
                        <Select
                            labelId="label"
                            id="select"
                            fullWidth
                            value={gender}
                            onChange={handleChange}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </div>

                    <div className={classes.selectBox}>
                        <InputLabel id="label">Family</InputLabel>
                        <Select
                            labelId="label"
                            id="select"
                            fullWidth
                            value={family}
                            onChange={handleFamilySelect}>
                            {familyArray.map(item => (
                                <MenuItem key={`${item._id}`} value={item._id}>
                                    {item.name}
                                </MenuItem>
                            ))}
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
