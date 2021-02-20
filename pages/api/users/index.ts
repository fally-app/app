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

    console.log('Users numbers', users.length)

    res.send(users)
})

handler.post(async (req, res) => {
    const newUser = await user.addUser(req.db, req.body)
    res.status(201).send({ success: true, data: newUser })
})

export default handler
