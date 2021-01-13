export default async function onError(error, req, res) {
    res.status(500).end(error.toString())
}
