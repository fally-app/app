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
import EditIcon from '@material-ui/icons/Edit'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import axios from 'axios'
import React from 'react'
import { IFamilyTypes } from '../models/Family'
import { UserType } from '../utils/types'

interface UpdateUserProps {
    user: UserType
    families: [
        {
            _id: string
            user_type: IFamilyTypes
            name: string
        }
    ]
    user_family: string
    mutate: () => any
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

export const UpdateUser: React.FC<UpdateUserProps> = ({
    user,
    user_family,
    mutate,
    families,
}): React.ReactElement => {
    const [openModal, setOpenModal] = React.useState(false)
    const [gender, setgender] = React.useState<string>(user.gender as string)
    const [firstName, setfirstName] = React.useState<string>(user.firstName)
    const [lastName, setlastName] = React.useState<string>(user.lastName)
    const [email, setEmail] = React.useState<string>(user.email)
    const [className, setClassName] = React.useState<string>(user.class_level)
    const [family, setFamily] = React.useState<string>(user_family)
    const [isSnackOpen, setSnackOpen] = React.useState<boolean>(false)
    const [erorr, setError] = React.useState<string>('')

    const classes = useStyles()

    const familyArray = families.filter(fam => fam.user_type != 'ADMIN')

    const handleClickOpen = () => {
        setOpenModal(true)
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setgender(event.target.value as string)
    }

    const handleFamilySelect = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setFamily(event.target.value as string)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    async function handleUserUpdate() {
        const data = {
            firstName,
            lastName,
            gender,
            family_id: family,
            class_level: className,
        }

        try {
            await axios.put(`/api/users/${user._id}`, data)
            mutate()
            handleClose()
        } catch (error) {
            setSnackOpen(true)

            if (error.response.data.error) {
                if (
                    !firstName ||
                    !lastName ||
                    !gender ||
                    !family ||
                    !className
                ) {
                    setError('Please insert into all fields')
                } else {
                    setError(error.response.data.error)
                }
            } else {
                setError('Some thing went wrong!')
            }
        }
    }
    return (
        <>
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
            <Button onClick={handleClickOpen}>
                <EditIcon />
            </Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    update {user.firstName} {user.lastName}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="fristname"
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={e => setfirstName(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        id="lastname"
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={e => setlastName(e.target.value)}
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
                            <MenuItem value="Female">Famale</MenuItem>
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
                    <Button onClick={handleUserUpdate} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default UpdateUser
