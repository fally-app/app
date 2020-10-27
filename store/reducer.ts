import { combineReducers } from 'redux'

import user from './slices/user'
import users from './slices/users'

const rootReducers = combineReducers({
    user,
    users,
})

export type RootState = ReturnType<typeof rootReducers>

export default rootReducers
