import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import FamilyReport from '../../../models/FamilyReport'
import connectDB from '../../../utils/connectDB'
import { getCurrentWeekofTheYear } from '../../../utils/Helpers'

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
        case 'POST':
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
                const family_id = (decoded as TokenDecode)._id

                const checkIfSaved = await FamilyReport.findOne({
                    family_code: family_id,
                    sabbath_week: getCurrentWeekofTheYear()[1],
                    year: getCurrentWeekofTheYear()[0],
                })

                if (checkIfSaved)
                    return res.status(404).json({
                        success: false,
                        error: 'You are trying to submit too many times',
                    })

                const data = new FamilyReport({
                    family_code: family_id,
                    presents: req.body.presents,
                    studied7times: req.body.studied7times,
                    startedSabbath: req.body.startedSabbath,
                    visited: req.body.visited,
                    wereVisted: req.body.wereVisted,
                    helped: req.body.helped,
                    wereHelped: req.body.wereHelped,
                    sick: req.body.sick,
                    vistors: req.body.vistors,
                    sabbath_week: getCurrentWeekofTheYear()[1],
                    year: getCurrentWeekofTheYear()[0],
                })

                await data.save()

                res.status(201).json({ success: true, data })
            } catch (error) {
                res.status(400).json({ success: true, error })
            }
            break
        default:
            res.status(400).json({ success: false, error: 'route not found' })
            break
    }
}
