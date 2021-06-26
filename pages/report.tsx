import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { GetServerSideProps } from 'next'
import React from 'react'
import NavBar from '../components/NavBar'
import { connectToDB, report } from '../db'

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
    },
    root: {
        width: '88%',
    },
    container: {
        maxHeight: 500,
    },
})

interface ReportProps {
    report: [
        {
            _id: string
            absent: 0
            created_at: string
            family: {
                _id: string
                name: string
            }
            helped: number
            presents: number
            sabbath_week: number
            sick: number
            startedSabbath: number
            studied7times: number
            visited: number
            visitors: number
            wereHelped: number
            wereVisited: number
            year: number
            percentage: number
        }
    ]
}

export const Report: React.FC<ReportProps> = ({
    report,
}): React.ReactElement => {
    const classes = useStyles()

    if (!report) {
        return <h1>SOmething went wrong</h1>
    }

    console.log({ report })

    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                {report.length > 0 ? (
                    <Paper className={classes.root}>
                        <TableContainer component={Paper}>
                            <Table aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Family name</TableCell>
                                        <TableCell align="right">
                                            Abaje
                                        </TableCell>

                                        <TableCell align="right">
                                            Abarwayi
                                        </TableCell>
                                        <TableCell align="right">
                                            Abafashije
                                        </TableCell>

                                        <TableCell align="right">
                                            Abafashijwe
                                        </TableCell>
                                        <TableCell align="right">
                                            Abasuye
                                        </TableCell>
                                        <TableCell align="right">
                                            Abasuwe
                                        </TableCell>
                                        <TableCell align="right">
                                            Abize 7
                                        </TableCell>
                                        <TableCell align="right">
                                            Abatangiye isabato
                                        </TableCell>
                                        <TableCell align="right">
                                            Abasibye
                                        </TableCell>
                                        <TableCell align="right">
                                            Abashyitsi
                                        </TableCell>
                                        <TableCell align="right">
                                            Percent
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {report.map(row => (
                                        <TableRow key={row._id}>
                                            <TableCell>
                                                {row.family.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.presents}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.sick}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.helped}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.wereHelped}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.visited}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.wereVisited}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.studied7times}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.startedSabbath}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.absent}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.visitors}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    color="primary"
                                                    label={`${row.percentage}%`}
                                                    style={{
                                                        backgroundColor:
                                                            row.percentage >= 70
                                                                ? '#22852b'
                                                                : row.percentage >=
                                                                  60
                                                                ? '#201b57'
                                                                : row.percentage >=
                                                                  50
                                                                ? '#850574'
                                                                : '#d60404',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ) : (
                    <div>No report today</div>
                )}
            </div>
        </>
    )
}
export default Report

export const getServerSideProps: GetServerSideProps = async () => {
    const { db } = await connectToDB()
    const reportData = await report.getCurrentReport(db)

    return {
        props: {
            report: JSON.parse(JSON.stringify(reportData)),
        },
    }
}
