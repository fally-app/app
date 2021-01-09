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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import axios from 'axios'
import React from 'react'

import { IFamilyTypes } from '../models/Family'
import { IStatus } from '../models/User'
import UpdateFam from './UpdateFam'

interface IFamilyType {
    _id: string
    user_type: IFamilyTypes
    name: string
    password: string
    code: string
    status: IStatus
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
        marginTop: '2rem',
    },
    container: {
        maxHeight: 500,
    },
    pointer: {
        cursor: 'pointer',
        outline: 'none',
        backgroundColor: 'transparent',
        border: 'none',
    },
})

interface FamilyProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: () => any
    families: IFamilyType[]
}

export const Family: React.FC<FamilyProps> = ({
    mutate,
    families,
}): React.ReactElement => {
    const classes = useStyles2()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const emptyRows = families
        ? rowsPerPage -
          Math.min(rowsPerPage, families.length - page * rowsPerPage)
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

    const handleDelete = async (id, name) => {
        if (confirm(`Are you sure to delete ${name}?`)) {
            await axios.delete(`/api/family/${id}`)
            mutate()
        } else {
            return
        }
    }

    if (!families) {
        return <div>Loading...</div>
    } else if (families.length <= 0) {
        return <h1>No user added yet</h1>
    } else {
        return (
            <>
                <h1>List of all families</h1>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Code</TableCell>
                                    <TableCell align="left">Type</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Update</TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? families.slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                      )
                                    : families
                                ).map((family, index) => (
                                    <TableRow key={family._id}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {family.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {family.code}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {family.user_type}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {family.status}
                                        </TableCell>

                                        <TableCell>
                                            <UpdateFam
                                                mutate={mutate}
                                                family={family}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                className={classes.pointer}
                                                onClick={() =>
                                                    handleDelete(
                                                        family._id,
                                                        `${family.name}`
                                                    )
                                                }>
                                                <DeleteOutlineIcon />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{ height: 53 * emptyRows }}>
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
                                        colSpan={9}
                                        count={families.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'family per page',
                                            },
                                            native: false,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={
                                            handleChangeRowsPerPage
                                        }
                                        ActionsComponent={
                                            TablePaginationActions
                                        }
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
            </>
        )
    }
}

export default Family
