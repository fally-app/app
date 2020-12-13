import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import FamilyReport from '../../../models/FamilyReport'
import connectDB from '../../../utils/connectDB'
import { getCurrentWeekInTheYear } from '../../../utils/Helpers'

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
                const attendance = await FamilyReport.find({
                    sabbath_week: getCurrentWeekInTheYear()[1],
                    year: getCurrentWeekInTheYear()[0],
                })
                    .populate('family')
                    .sort({ percentage: -1 })
                res.status(200).json({ success: true, data: attendance })
            } catch (error) {
                res.status(400).json({ success: true, error })
            }
            break
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
                    family: family_id,
                    sabbath_week: getCurrentWeekInTheYear()[1],
                    year: getCurrentWeekInTheYear()[0],
                })

                if (checkIfSaved)
                    return res.status(404).json({
                        success: false,
                        error: 'You are trying to submit too many times',
                    })

                const data = new FamilyReport({
                    family: family_id,
                    presents: req.body.presents,
                    studied7times: req.body.studied7times,
                    startedSabbath: req.body.startedSabbath,
                    visited: req.body.visited,
                    wereVisted: req.body.wereVisted,
                    helped: req.body.helped,
                    wereHelped: req.body.wereHelped,
                    sick: req.body.sick,
                    vistors: req.body.vistors,
                    absent: req.body.absent,
                    sabbath_week: getCurrentWeekInTheYear()[1],
                    year: getCurrentWeekInTheYear()[0],
                    percentage: `${Math.round(
                        ((req.body.presents /
                            (req.body.presents +
                                req.body.absent +
                                req.body.sick)) *
                            100 +
                            (req.body.studied7times / req.body.presents) * 100 +
                            (req.body.startedSabbath /
                                (req.body.presents +
                                    req.body.absent +
                                    req.body.sick)) *
                                100) /
                            3
                    )}`,
                })

                await data.save()

                res.status(201).json({ success: true, data })
            } catch (error) {
                res.status(400).json({ success: true, error })
            }
            break
        default:
            res.status(400).json({ success: true })
            break
    }
}
