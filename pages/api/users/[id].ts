import { user } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { Request } from '@/utils/types'
import { NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<Request, NextApiResponse>({ onError })

handler.use(middleware)

handler.get(async (req, res) => {
    const getUser = await user.findUserById(req.db, req.query.id as string)
    res.status(200).json({ success: true, data: getUser })
})

handler.post(async (req, res) => {
    const addedUser = await user.addUser(req.db, req.query.id as string)
    res.status(201).json({ success: true, data: addedUser })
})

handler.put(async (req, res) => {
    const update = await user.updateUser(
        req.db,
        req.query.id as string,
        req.body
    )
    res.status(200).json({ success: true, data: update })
})

handler.delete(async (req, res) => {
    await user.deleteUser(req.db, req.query.id as string)
    res.status(200).json({ success: true, data: {} })
})

export default handler
