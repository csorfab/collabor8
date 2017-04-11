import { combineReducers } from 'redux'
import { ADD_OFFER, REMOVE_ALL_OFFERS, REMOVE_RANDOM_OFFERS, SIGNED_IN, LOGOUT, UPDATE_STATUS, SET_GAUTH2 } from '../actions'

import { sessionReducer } from '../containers/SessionManager/reducer'

const offerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_OFFER':
            if(action.offer.id == state.id)
                return action.offer
            else
                return state    
    }
}

const offersReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_OFFERS':
            return action.offers    
        case 'UPDATE_OFFER':
            return state.map(offer => offerReducer(offer, action))
        case ADD_OFFER:
            return [action.offer, ...state]
        case REMOVE_ALL_OFFERS:
            return []
        case REMOVE_RANDOM_OFFERS:
            let a = [0,0,0].map(x => Math.floor(Math.random()*state.length))    
            
            return state.filter((o, i) =>
                    a.reduce((prevV, currV) => prevV && !(currV == i), true)
                )
        default:
            return state
    }
}

const rootReducer = combineReducers({
    offers: offersReducer,
    session: sessionReducer
});

export default rootReducer