import { Button, Checkbox, TableContainer } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField/TextField'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import axios from 'axios'
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

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const MakeAttendance: React.FC<MakeAttendanceProps> = ({
    users,
}): React.ReactElement => {
    const classes = useStyles()

    const [presents, setpresents] = React.useState<string[]>([])
    const [vistors, setvistors] = React.useState<string>('0')
    const [visit, setvistist] = React.useState<string[]>([])
    const [visited, setvisited] = React.useState<string[]>([])
    const [helped, sethelpded] = React.useState<string[]>([])
    const [washelped, setwashelpded] = React.useState<string[]>([])
    const [sick, setsick] = React.useState<string[]>([])
    const [studied, setstudied] = React.useState<string[]>([])
    const [startedSabbath, setStartedSabbath] = React.useState<string[]>([])
    const [error, setError] = React.useState<string>()
    const [saved, setsaved] = React.useState<string>()

    const isPresent = id => presents.includes(id)
    const hasVisited = id => visit.includes(id)
    const wasvisted = id => visited.includes(id)
    const hasHelped = id => helped.includes(id)
    const wasGivenHelp = id => washelped.includes(id)
    const isSick = id => sick.includes(id)
    const hasStudied = id => studied.includes(id)
    const hasStarted = id => startedSabbath.includes(id)

    const handleStarted = id => {
        if (!startedSabbath.includes(id)) {
            setStartedSabbath([...startedSabbath, id])
        } else {
            setStartedSabbath(startedSabbath.filter(s => s != id))
        }
    }

    const handleStudied = id => {
        if (!studied.includes(id)) {
            setstudied([...studied, id])
        } else {
            setstudied(studied.filter(s => s != id))
        }
    }

    const handleSick = id => {
        if (!sick.includes(id)) {
            setsick([...sick, id])
        } else {
            setsick(sick.filter(s => s != id))
        }
    }

    const handelWasHelped = id => {
        if (!washelped.includes(id)) {
            setwashelpded([...washelped, id])
        } else {
            setwashelpded(washelped.filter(w => w != id))
        }
    }

    const handleHelp = id => {
        if (!helped.includes(id)) {
            sethelpded([...helped, id])
        } else {
            sethelpded(helped.filter(h => h != id))
        }
    }

    const handlePresence = id => {
        if (!presents.includes(id)) {
            setpresents([...presents, id])
        } else {
            setpresents(presents.filter(p => p != id))
        }
    }

    const handlewasvisted = id => {
        if (!visited.includes(id)) {
            setvisited([...visited, id])
        } else {
            setvisited(visited.filter(v => v != id))
        }
    }

    const handleVisit = id => {
        if (!visit.includes(id)) {
            setvistist([...visit, id])
        } else {
            setvistist(visit.filter(v => v != id))
        }
    }

    const handleSubmit = async () => {
        const data = {
            presents: presents.length,
            vistors: parseInt(vistors),
            visited: visit.length,
            wereVisted: visited.length,
            helped: helped.length,
            wereHelped: washelped.length,
            sick: sick.length,
            studied7times: studied.length,
            startedSabbath: startedSabbath.length,
            absent: users.length - presents.length + sick.length,
        }

        try {
            const token = localStorage.getItem('auth-token')

            await axios.post('/api/family/attendance', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            setpresents([])
            setvistors('')
            setvistist([])
            setvisited([])
            sethelpded([])
            setwashelpded([])
            setsick([])
            setstudied([])
            setStartedSabbath([])
            setsaved('Saved successfully')
        } catch (error) {
            setError(
                error.response.data.error
                    ? error.response.data.error
                    : 'sometihng went wrong'
            )
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setError(null)
    }

    const handleCloseSuccess = (
        event?: React.SyntheticEvent,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setsaved(null)
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.divider}>
                <Snackbar
                    open={error != null}
                    autoHideDuration={2000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {error}
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={saved != null}
                    autoHideDuration={2000}
                    onClose={handleCloseSuccess}>
                    <Alert onClose={handleCloseSuccess} severity="success">
                        {saved}
                    </Alert>
                </Snackbar>

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
                                            checked={isPresent(row._id)}
                                            color="primary"
                                            onChange={() =>
                                                handlePresence(row._id)
                                            }
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={hasVisited(row._id)}
                                            onChange={() =>
                                                handleVisit(row._id)
                                            }
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={wasvisted(row._id)}
                                            onChange={() =>
                                                handlewasvisted(row._id)
                                            }
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={hasHelped(row._id)}
                                            onChange={() => handleHelp(row._id)}
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={wasGivenHelp(row._id)}
                                            onChange={() =>
                                                handelWasHelped(row._id)
                                            }
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={isSick(row._id)}
                                            onChange={() => handleSick(row._id)}
                                            disabled={isPresent(row._id)}
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={hasStudied(row._id)}
                                            onChange={() =>
                                                handleStudied(row._id)
                                            }
                                            color="primary"
                                            inputProps={{
                                                'aria-label':
                                                    'secondary checkbox',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={hasStarted(row._id)}
                                            onChange={() =>
                                                handleStarted(row._id)
                                            }
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
                    value={vistors}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={e => setvistors(e.target.value)}
                    className={classes.divider}
                    size="small"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    )
}
export default MakeAttendance
