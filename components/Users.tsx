import { TableRow } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import {
    createStyles,
    makeStyles,
    Theme,
    useTheme,
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import React from 'react'

import { Gender, IStatus } from '../models/User'

interface IuserType {
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
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxHeight: 440,
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    })
)

interface TablePaginationActionsProps {
    count: number
    page: number
    rowsPerPage: number
    onChangePage: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles()
    const theme = useTheme()
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, 0)
    }

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, page - 1)
    }

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, page + 1)
    }

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page">
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page">
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page">
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page">
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </div>
    )
}

const useStyles2 = makeStyles({
    root: {
        width: '80%',
    },
    container: {
        maxHeight: 440,
    },
})

interface UsersProps {
    users: IuserType[]
}

export const Users: React.FC<UsersProps> = ({ users }): React.ReactElement => {
    const classes = useStyles2()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const emptyRows = users
        ? rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)
        : 0

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    if (!users) {
        return <div>Loading...</div>
    } else {
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">LastName</TableCell>
                                <TableCell align="left">Gender</TableCell>
                                <TableCell align="left">Class</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? users.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                                : users
                            ).map((user, index) => (
                                <TableRow key={user._id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {user.lastName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {user.gender}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {user.class_level}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[
                                        5,
                                        10,
                                        25,
                                        { label: 'All', value: -1 },
                                    ]}
                                    colSpan={6}
                                    count={users.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'users per page',
                                        },
                                        native: false,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}

export default Users
