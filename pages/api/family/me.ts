// import { createToken } from '../../../../utils/Helpers'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import Family from '../../../models/Family'
import connectDB from '../../../utils/connectDB'

interface TokenDecode {
    _id: string
    ait: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { method } = req
    await connectDB()

    switch (method) {
        case 'GET':
            try {
                let token
                if (
                    req.headers.authorization &&
                    req.headers.authorization.startsWith('Bearer')
                ) {
                    token = req.headers.authorization.split(' ')[1]
                }

                if (!token) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Not token passed' })
                }

                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const user = await Family.findById((decoded as TokenDecode)._id)
                res.status(200).json({ success: true, user })
            } catch (error) {
                res.status(400).json({ success: true, error })
            }
            break
        default:
            res.status(400).json({ success: true })
            break
    }
}
