import { NextApiResponse } from 'next'
import nc from 'next-connect'
import { report } from '../../../db'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { Request } from '../../../utils/types'

const handler = nc<Request, NextApiResponse>({ onError })

handler.use(middleware)

handler.post(async (req, res) => {
    const newAttendance = await report.addReport(req.db, req.body)
    res.send({ data: newAttendance })
})
