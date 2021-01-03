export default async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
        req.token = token
        next()
    } else {
        res.status(401)
        next()
    }
}
