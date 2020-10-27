import { combineReducers } from 'redux'

import count from './slices/count'
import user from './slices/user'
import users from './slices/users'

const rootReducers = combineReducers({
    count,
    user,
    users,
})

export type RootState = ReturnType<typeof rootReducers>

export default rootReducers
