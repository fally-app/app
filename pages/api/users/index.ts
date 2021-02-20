import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { user } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { Request } from '@/utils/types'

const handler = nc<Request, NextApiResponse>({ onError })

handler.use(middleware)

handler.get(async (req, res) => {
    const users = await user.getAllUsers(req.db)
    res.send(users)
})

handler.post(async (req, res) => {
    const dataToInsert = {
        ...req.body,
        family_id: new ObjectId(req.body.family_id),
    }

    const newUser = await user.addUser(req.db, dataToInsert)
    res.status(201).send({ success: true, data: newUser })
})

export default handler
