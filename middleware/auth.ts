import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        req.token = token
        next()
    } else {
        res.status(401)
        next()
    }
}

export const getUserIdFromToken = async token => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (user as any).id
    } catch (e) {
        return null
    }
}
