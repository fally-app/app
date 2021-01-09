import nc from 'next-connect'

import { user } from '../../../db'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
// import { codeGenerator } from '../../../utils/Helpers'
import { Request } from '../../../utils/types'

const handler = nc({ onError })

handler.use(middleware)

handler.get(async (req: Request, res) => {
    const users = await user.getAllUsers(req.db)
    res.send({ data: users })
})

handler.post(async (req: Request, res) => {
    const newUser = await user.addUser(req.db, req.body)
    res.send(newUser)
})

export default handler
// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ): Promise<void> {
//     await connectDB()
//     const { method } = req

//     switch (method) {
//         case 'GET':
//             try {
//                 const { db } = await connectToDB()
//                 const users = await user.getAllUsers(db)
//                 res.status(200).send(users)
//             } catch (error) {
//                 res.status(400).json({ success: false, error })
//             }
//             break
//         case 'POST':
//             try {
//                 const {
//                     firstName,
//                     lastName,
//                     gender,
//                     email,
//                     family_id,
//                     class_level,
//                 } = req.body

//                 if (!firstName || !lastName || !family_id || !class_level)
//                     return res.status(400).json({
//                         success: false,
//                         error: 'All fields are required',
//                     })

//                 const users = new User({
//                     firstName,
//                     lastName,
//                     gender,
//                     email,
//                     family_id,
//                     class_level,
//                 })
//                 users.code = codeGenerator('user')
//                 await users.save()
//                 res.status(200).json({ success: true, data: users })
//             } catch (error) {
//                 res.status(400).json({ success: false, error })
//             }
//             break
//         default:
//             res.status(404).json({ success: false })
//             break
//     }
// }
