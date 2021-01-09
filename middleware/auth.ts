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
        req.user = await family.getFamilyByCode(
            db,
            (decoded as TokenDecode)._id
        )

        next()
    } else {
        res.status(401)
        next()
    }
}

export const getUserIdFromToken = async token => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        console.log(user)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (user as any).id
    } catch (e) {
        return null
    }
}
