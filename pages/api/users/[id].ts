import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { user } from '@/db/index'
import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import { Request } from '@/utils/types'

const handler = nc<Request, NextApiResponse>({ onError })

handler.use(middleware)

handler.get(async (req, res) => {
    const getUser = await user.findUserById(req.db, req.query.id)
    if (!getUser) return res.status(400).json({ success: true })
    res.status(200).json({ success: true, data: getUser })
})

handler.post(async (req, res) => {
    const addedUser = await user.addUser(req.db, req.query.id)
    res.status(201).json({ success: true, data: addedUser })
})

handler.put(async (req, res) => {
    const update = await user.updateUser(req.db, req.query.id, req.body)
    res.status(200).json({ success: true, data: update })
})

handler.delete(async (req, res) => {
    await user.deleteUser(req.db, req.query.id)
    res.status(200).json({ success: true, data: {} })
})

export default handler

//         case 'PUT':
//             try {
//                 const user = await User.findByIdAndUpdate(id, req.body, {
//                     new: true,
//                     runValidators: true,
//                 })
//                 if (!user)
//                     return res.status(400).json({ success: true, data: user })
//                 res.status(201).json({ success: true, data: user })
//             } catch (error) {
//                 res.status(404).json({ success: true, error })
//             }
//             break

//         case 'DELETE':
//             try {
//                 const deletedUser = await User.deleteOne({ _id: id })
//                 if (!deletedUser)
//                     return res.status(400).json({ success: false })
//                 res.status(200).json({ success: true, data: {} })
//             } catch (error) {
//                 res.status(400).json({ success: true, error })
//             }
//             break
//         default:
//             res.status(400).json({ success: true })
//             break
//     }
// }
