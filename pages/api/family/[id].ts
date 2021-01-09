import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { family } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { Request } from '@/utils/types'

const handler = nc<Request, NextApiResponse>({ onError })

handler.get(async (req, res) => {
    const fam = await family.getFamilyById(req.db, req.query.id as string)
    res.send(fam)
})

handler.put(async (req, res) => {
    const fam = await family.updateFamily(
        req.db,
        req.query.id as string,
        req.body
    )
    res.status(201).json({ success: true, data: fam })
})

handler.delete(async (req, res) => {
    await family.deleteFamily(req.db, req.query.id as string)
    res.status(201).json({ success: true, data: {} })
})
handler.use(middleware)
