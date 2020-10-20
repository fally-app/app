import { NextApiRequest, NextApiResponse } from 'next'

import Attendance from '../../../models/Attendances'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const attend = await Attendance.find().sort({ created_at: 1 })
                res.status(200).json({ success: true, data: attend })
            } catch (error) {
                res.status(200).json({ error, success: false })
            }
            break
        case 'POST':
            try {
                const attendance = new Attendance(req.body)
                attendance.save()
                res.status(200).json({ success: true, data: attendance })
            } catch (error) {
                res.status(200).json({ error, success: false })
            }
            break
        default:
            res.status(400).json({ success: true })
            break
    }
}
