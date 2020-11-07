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
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import TextField from '@material-ui/core/TextField'
import React from 'react'

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
interface UpdateUserModalProps {
    isUpdateModalOpen: boolean
    handleCloseupdateModal: () => void
}

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
    isUpdateModalOpen,
    handleCloseupdateModal,
}): React.ReactElement => {
    const classes = useStyles()

    console.log(isUpdateModalOpen)

    const [gender, setgender] = React.useState('')

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setgender(event.target.value as string)
    }

    return (
        <Dialog open={isUpdateModalOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">update user</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="fristname"
                    label="First Name"
                    type="text"
                    fullWidth
                />

                <TextField
                    margin="dense"
                    id="lastname"
                    label="Last Name"
                    type="text"
                    fullWidth
                />

                <TextField
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />

                <TextField
                    margin="dense"
                    id="class_name"
                    label="Class Name"
                    type="text"
                    fullWidth
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
                        <MenuItem value="Female">Famle</MenuItem>
                    </Select>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseupdateModal} color="primary">
                    close
                </Button>
                <Button onClick={handleCloseupdateModal} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default UpdateUserModal
