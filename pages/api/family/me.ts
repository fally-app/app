// import jwt from 'jsonwebtoken'
// import { NextApiRequest, NextApiResponse } from 'next'

// import Family from '../../../models/Family'
// import connectDB from '../../../utils/connectDB'

// interface TokenDecode {
//     _id: string
//     ait: string
// }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ): Promise<void> {
//     const { method } = req
//     await connectDB()

//     switch (method) {
//         case 'GET':
//             try {
//                 let token
//                 if (
//                     req.headers.authorization &&
//                     req.headers.authorization.startsWith('Bearer')
//                 ) {
//                     token = req.headers.authorization.split(' ')[1]
//                 }

//                 if (!token) {
//                     return res
//                         .status(404)
//                         .json({ success: false, error: 'Not token passed' })
//                 }

//                 const decoded = jwt.verify(token, process.env.JWT_SECRET)
//                 const user = await Family.findById((decoded as TokenDecode)._id)
//                 res.status(200).json({ success: true, data: user })
//             } catch (error) {
//                 res.status(400).json({ success: true, error })
//             }
//             break
//         default:
//             res.status(400).json({ success: true })
//             break
//     }
// }

import nc from 'next-connect'

import middleware from '@/middleware/all'
import onError from '@/middleware/error'

const handler = nc({ onError })

handler.use(middleware)

handler.get(async (req, res) => {
    res.send({ success: true, data: req?.user })
})

export default handler
