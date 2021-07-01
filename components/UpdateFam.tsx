import { FamilyType } from '@/utils/types'
import {
    createStyles,
    InputLabel,
    makeStyles,
    MenuItem,
    Select
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

interface UpdateUserProps {
    family: FamilyType
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

export const UpdateFam: React.FC<UpdateUserProps> = ({
    mutate,
    family,
}): React.ReactElement => {
    const [openModal, setOpenModal] = React.useState(false)
    const [type, setType] = React.useState<string>(family.user_type)
    const [name, setName] = React.useState<string>(family.name)
    const [status, setStatus] = React.useState<string>(family?.status)
    // const [password, setPassword] = React.useState<string>()
    const [isSnackOpen, setSnackOpen] = React.useState<boolean>(false)
    const [erorr, setError] = React.useState<string>('')

    const classes = useStyles()

    const handleClickOpen = () => {
        setOpenModal(true)
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as string)
    }

    const handleChangeStatus = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setStatus(event.target.value as string)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    async function handleUserUpdate() {
        const data = {
            user_type: type,
            name,
            status,
            // password,
        }

        try {
            await axios.put(`/api/family/${family._id}`, data)
            mutate()
            handleClose()
        } catch (error) {
            setSnackOpen(true)

            if (error.response.data.error) {
                if (!type || !name) {
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
                    update {family.name}
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

                    <div className={classes.selectBox}>
                        <InputLabel id="label">Status</InputLabel>
                        <Select
                            labelId="label"
                            id="select"
                            fullWidth
                            value={status}
                            onChange={handleChangeStatus}>
                            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                            <MenuItem value="DIACTIVE">DIACTIVE</MenuItem>
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
export default UpdateFam
