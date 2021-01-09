// import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { user } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { Request } from '@/utils/types'

const handler = nc({ onError })

handler.use(middleware)

handler.get(async (req: Request, res) => {
    const users = await user.getAllUsers(req.db)
    res.send(users)
})

handler.post(async (req: Request, res) => {
    const newUser = await user.addUser(req.db, req.body)
    res.send(newUser)
})

export default handler
