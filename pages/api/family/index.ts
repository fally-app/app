import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { family } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { Request } from '@/utils/types'

const handler = nc<Request, NextApiResponse>({ onError })
handler.use(middleware)

handler.get(async (req, res) => {
    const families = await family.getFamilies(req.db)
    res.status(200).send(families)
})

handler.post(async (req, res) => {
    const fam = await family.insertNewFamily(req.db, req.body)
    res.status(201).json({ success: true, data: fam })
})

export default handler
