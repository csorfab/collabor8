import { combineReducers } from 'redux'
import { ADD_OFFER } from '../actions'

const rootReducer = (state = { offers: [] }, action) => {
    switch (action.type) {
        case ADD_OFFER:
            return { offers: [...state.offers, action.offer] }
        default:
            return state
    }

    return state
}

export default rootReducer