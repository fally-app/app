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

handler.post(async (req, res) => {
    const { code, password } = req.body

    if (!code || !password)
        return res.status(404).json({
            success: false,
            error: 'All fields are required',
        })

    const checkFamily = await family.getFamilyByCode(req.db, code)

    if (!checkFamily)
        return res.send({ success: false, error: 'Invalid code or password' })

    const isPasswordValid = await bcrypt.compare(password, checkFamily.password)

    if (!isPasswordValid)
        return res.send({ success: false, error: 'Invalid code or password' })

    res.status(201).json({
        success: true,
        data: createToken(checkFamily),
    })
})

export default handler
