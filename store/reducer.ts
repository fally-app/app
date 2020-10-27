import { combineReducers } from 'redux'

import count from './slices/count'

const rootReducers = combineReducers({
    count,
})

export type RootState = ReturnType<typeof rootReducers>

export default rootReducers
