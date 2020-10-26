import { combineReducers } from 'redux'

import count from './slices/count'

const reducers = combineReducers({
    count,
})

export default reducers
