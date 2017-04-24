import { combineReducers } from 'redux'

import offers from './offers'
import session from './session'
import users from './users'


const rootReducer = combineReducers({
    offers,
    users,
    session
});

export default rootReducer