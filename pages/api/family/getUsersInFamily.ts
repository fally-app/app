import { user } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { Request } from '@/utils/types'
import { NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<Request, NextApiResponse>({ onError })

handler.use(middleware)

handler.get(async (req, res) => {
    const users = await user.getUsersInFamily(req.db, req.user._id)
    res.send({ success: true, data: users })
})

export default handler
