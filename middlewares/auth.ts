// import { NextApiRequest, NextApiResponse } from 'next'

// import { getUserFromToken } from '../utils/Helpers'

// const protect = async (req: NextApiRequest, res: NextApiResponse, next) => {
//     let token: string
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         token = req.headers.authorization.split(' ')[1]
//     }

//     if (!token)
//         return res.status(401).json({ success: false, error: 'unauthorized' })

//     try {
//         req.body.user = getUserFromToken(token)
//         next()
//     } catch (error) {
//         res.status(401).json({ success: false, error: 'unauthorized' })
//     }
// }

// const authorize = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.user_type)) {
//             return res
//                 .status(200)
//                 .json({ success: false, error: 'User not authorized' })
//         }
//         next()
//     }
// }

// export default { protect, authorize }
