import { NextApiRequest, NextApiResponse } from 'next'

import User, { IStatus } from '../../../models/User'
import connectDB from '../../../utils/connectDB'
import { codeGenerator } from '../../../utils/Helpers'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await connectDB()
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const Users = await User.find({ status: IStatus.ACTIVE }).sort({
                    name: 1,
                })
                res.status(200).json({ success: false, data: Users })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'POST':
            try {
                const users = new User(req.body)
                users.code = codeGenerator('user')
                await users.save()
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(404).json({ success: false })
            break
    }
}
