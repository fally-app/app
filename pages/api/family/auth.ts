import bcrypt from 'bcrypt'
import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { family } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { createToken } from '@/utils/Helpers'
import { Request } from '@/utils/types'

const handler = nc<Request, NextApiResponse>({ onError })

handler.use(middleware)

handler.use('/login', async (req, res) => {
    const checkFamily = await family.getFamilyByCode(
        req.db,
        req.query.code as string
    )

    console.log('check family ', checkFamily)

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        checkFamily.password
    )

    if (!checkFamily || !isPasswordValid)
        res.send({ success: false, error: 'Invalid code or password' })

    res.status(201).json({
        success: true,
        data: createToken(checkFamily),
    })
})

export default handler
