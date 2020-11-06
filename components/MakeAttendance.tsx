import { Button, Checkbox, TableContainer } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField/TextField'
import React from 'react'

import { Gender, IStatus } from '../models/User'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxHeight: 440,
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
        divider: {
            marginBottom: '1rem',
        },
        verticalDivider: {
            borderRight: '1px solid #ccc',
        },
        formContent: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'flex-end',
        },
    })
)

interface MakeAttendanceProps {
    users: [
        {
            _id: string
            firstName: string
            lastName: string
            email?: string
            family_id: string
            gender?: Gender
            status: IStatus
            class_level: string
            joined_at: string
        }
    ]
}

export const MakeAttendance: React.FC<MakeAttendanceProps> = ({
    users,
}): React.ReactElement => {
    const classes = useStyles()
    // const [checked, setChecked] = React.useState(true)

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked(event.target.checked)
    // }

    return (
        <div className={classes.root}>
            <Paper className={classes.divider}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Names</TableCell>
                                <TableCell align="right">Yaje</TableCell>
                                <TableCell align="right">Yarasuye</TableCell>
                                <TableCell align="right">Yarasuwe</TableCell>
                                <TableCell align="right">Yarafashije</TableCell>
                                <TableCell align="right">
                                    Yarafashijwe
                                </TableCell>
                                <TableCell align="right">Ararwaye</TableCell>
                                <TableCell align="right">Yize 7</TableCell>
                                <TableCell align="right">
                                    Yatangiye isabato
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        className={classes.verticalDivider}>
                                        {row.firstName} {row.lastName}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>{' '}
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>{' '}
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <div className={classes.formContent}>
                <TextField
                    id="outlined-basic"
                    label="Number of visitors"
                    type="number"
                    variant="outlined"
                    className={classes.divider}
                />
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </div>
    )
}
export default MakeAttendance
