import nc from 'next-connect'

import auth from './auth'
import db from './db'

const middleware = nc()
middleware.use(db).use(auth)
export default middleware
