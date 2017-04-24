import { combineReducers } from 'redux'

import offers from './offers'
import session from './session'


const rootReducer = combineReducers({
    offers,
    session
});

export default rootReducer