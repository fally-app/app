export default async (req, res, next) => {
    const token =
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')

    if (token) {
        req.token = token
        next()
    } else {
        res.status(401)
        next()
    }
}
