// import jwt from 'jsonwebtoken'

// import Family from '../models/Family'

// const isAuth = next => async (req, res, next) => {
//     let token
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         token = req.headers.authorization.split(' ')[1]
//     }
//     if (!token) {
//         return res
//             .status(404)
//             .json({ success: false, error: 'Not token passed' })
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SCRET)
//         req.user = await Family.findById((<any>decoded).id)
//         if (!req.user) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: 'User not found' })
//         }
//         return next(req, res)
//     } catch (err) {
//         return res
//             .status(404)
//             .json({ success: false, error: 'some thing went wrong' })
//     }
// }

// export default isAuth
