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
                const Users = await User.find({ status: IStatus.ACTIVE })
                    .sort({
                        firstName: 1,
                    })
                    .populate('family_id')
                res.status(200).json({ success: false, data: Users })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'POST':
            try {
                const {
                    firstName,
                    lastName,
                    gender,
                    email,
                    family_id,
                    class_level,
                } = req.body

                if (!firstName || !lastName || !family_id || !class_level)
                    return res.status(400).json({
                        success: false,
                        error: 'All fields are required',
                    })

                const users = new User({
                    firstName,
                    lastName,
                    gender,
                    email,
                    family_id,
                    class_level,
                })
                users.code = codeGenerator('user')
                await users.save()
                res.status(200).json({ success: true, data: users })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        default:
            res.status(404).json({ success: false })
            break
    }
}
