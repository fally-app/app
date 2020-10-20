import { NextApiRequest, NextApiResponse } from 'next'

import User from '../../../models/User'
import connectDB from '../../../utils/connectDB'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await connectDB()

    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(id)
                if (!user) return res.status(400).json({ success: true })
                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(404).json({ success: true, error })
            }
            break
        case 'PUT':
            try {
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!user)
                    return res.status(400).json({ success: true, data: user })
                res.status(201).json({ success: true, data: user })
            } catch (error) {
                res.status(404).json({ success: true, error })
            }
            break

        case 'DELETE':
            try {
                const deletedUser = await User.deleteOne({ _id: id })
                if (!deletedUser)
                    return res.status(400).json({ success: false })
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: true, error })
            }
            break
        default:
            res.status(400).json({ success: true })
            break
    }
}
