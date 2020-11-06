import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'

import NavBar from '../components/NavBar'

const TAX_RATE = 0.07

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
    },
    root: {
        width: '80%',
    },
    container: {
        maxHeight: 440,
    },
})

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`
}

function priceRow(qty: number, unit: number) {
    return qty * unit
}

function createRow(desc: string, qty: number, unit: number) {
    const price = priceRow(qty, unit)
    return { desc, qty, unit, price }
}

interface Row {
    desc: string
    qty: number
    unit: number
    price: number
}

function subtotal(items: Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0)
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
]

const invoiceSubtotal = subtotal(rows)
const invoiceTaxes = TAX_RATE * invoiceSubtotal
const invoiceTotal = invoiceTaxes + invoiceSubtotal

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
            vistors: number
            wereHelped: number
            wereVisted: number
            year: number
        }
    ]
}

export const Report: React.FC<ReportProps> = ({
    report,
}): React.ReactElement => {
    const classes = useStyles()

    console.log(report)
    return (
        <>
            <NavBar />
            <div className={classes.wrapper}>
                <Paper className={classes.root}>
                    <TableContainer component={Paper}>
                        <Table aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={9}>
                                        Details
                                    </TableCell>
                                    <TableCell align="right">%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Family name</TableCell>
                                    <TableCell align="right">Abaje</TableCell>

                                    <TableCell align="right">
                                        Abarwayi
                                    </TableCell>
                                    <TableCell align="right">
                                        Abafashije
                                    </TableCell>

                                    <TableCell align="right">
                                        Abafashijwe
                                    </TableCell>

                                    <TableCell align="right">Abasuye</TableCell>

                                    <TableCell align="right">Abasuwe</TableCell>

                                    <TableCell align="right">Abize 7</TableCell>
                                    <TableCell align="right">
                                        Abatangiye isabato
                                    </TableCell>
                                    <TableCell align="right">
                                        Abasibye
                                    </TableCell>
                                    <TableCell align="right">
                                        Abashyitsi
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {report.map(row => (
                                    <TableRow key={row._id}>
                                        <TableCell>{row.family.name}</TableCell>
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
                                            {row.wereVisted}
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
                                            {row.vistors}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(invoiceSubtotal)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell align="right">{`${(
                                        TAX_RATE * 100
                                    ).toFixed(0)} %`}</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(invoiceTaxes)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(invoiceTotal)}
                                    </TableCell>
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </>
    )
}
export default Report

export const getServerSideProps: GetServerSideProps = async context => {
    const result = await Axios.get(
        process.env.SERVER_BASE_URL + '/api/family/attendance'
    )

    return {
        props: {
            report: result.data.data,
        },
    }
}
