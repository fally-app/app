import middleware from '@/middleware/all'
import onError from '@/middleware/error'
import nc from 'next-connect'

const handler = nc({ onError })

handler.use(middleware)

handler.get(async (req, res) => {
    res.send({ success: true, data: req?.user })
})

export default handler
