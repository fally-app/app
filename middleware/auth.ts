import jwt from 'jsonwebtoken'

import { connectToDB, family } from '@/db/index'
import { TokenDecode } from '@/utils/types'

export default async (req, res, next) => {
    const { db } = await connectToDB()
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res
                .status(404)
                .json({ success: false, error: 'Not token passed' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await family.getFamilyById(
            db,
            (decoded as TokenDecode)._id
        )

        req.user = user

        next()
    } else {
        res.status(401)
        next()
    }
}
