import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

import Family from '../../../models/Family'
import connectDB from '../../../utils/connectDB'
import { createToken } from '../../../utils/Helpers'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { method } = req
    await connectDB()

    switch (method) {
        case 'POST':
            try {
                const { code, password } = req.body

                if (!code || !password)
                    return res.status(404).json({
                        success: false,
                        error: 'All fields are required',
                    })

                const findUser = await Family.findOne({ code })

                if (!findUser)
                    return res.status(400).json({
                        success: false,
                        error: 'Invalid email or password',
                    })

                const isPasswordValid = await bcrypt.compare(
                    password,
                    findUser.password
                )

                if (!isPasswordValid)
                    return res.status(400).json({
                        success: false,
                        error: 'Invalid email or password',
                    })

                res.status(201).json({
                    success: true,
                    data: createToken(findUser),
                })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(400).json({ success: true })
            break
    }
}
