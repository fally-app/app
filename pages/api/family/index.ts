// import { NextApiRequest, NextApiResponse } from 'next'

// import Family from '../../../models/Family'
// import connectDB from '../../../utils/connectDB'
// import { codeGenerator } from '../../../utils/Helpers'

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ): Promise<void> {
//     const { method } = req
//     await connectDB()

//     switch (method) {
//         case 'GET':
//             try {
//                 const families = await Family.find()
//                 res.status(200).json({ success: true, data: families })
//             } catch (error) {
//                 res.status(400).json({ success: false })
//             }
//             break
//         case 'POST':
//             try {
//                 const { name, password, user_type } = req.body
//                 const checkExists = await Family.findOne({ name })

//                 if (checkExists)
//                     return res.status(404).json({
//                         success: false,
//                         error: 'Family already exists',
//                     })

//                 const newFam = {
//                     name,
//                     password,
//                     user_type,
//                     code: '',
//                 }

//                 newFam.code = codeGenerator('family')

//                 const family = new Family(newFam)
//                 await family.save()

//                 res.status(201).json({ success: true, data: family })
//             } catch (error) {
//                 res.status(400).json({ success: false, error })
//             }
//             break

//         default:
//             res.status(400).json({ success: true })
//             break
//     }
// }

import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { family } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { Request } from '@/utils/types'

const handler = nc<Request, NextApiResponse>({ onError })

handler.get(async (req, res) => {
    const families = await family.getFamilies(req.db)
    res.status(200).json({ success: true, data: families })
})

export default handler
