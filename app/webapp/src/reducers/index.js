import { combineReducers } from 'redux'
import { ADD_OFFER, REMOVE_ALL_OFFERS, REMOVE_RANDOM_OFFERS, SIGNED_IN, LOGOUT } from '../actions'


const rootReducer = (state, action) => {
    switch (action.type) {
        case LOGOUT:
            return Object.assign({}, state, {
                session: {
                    signedIn: false,
                    user: {}
                }
            })
        case SIGNED_IN:
            return Object.assign({}, state, {
                session: {
                    signedIn: true,
                    user: action.user
                }
            })
        case ADD_OFFER:
            return Object.assign({}, state,
                { offers: [...state.offers, action.offer] }
            )
        case REMOVE_ALL_OFFERS:
            return Object.assign({}, state, { offers: [] })
        case REMOVE_RANDOM_OFFERS:
            let a = [0,0,0].map(x => Math.floor(Math.random()*state.offers.length))    
            
            return Object.assign({}, state, {
                offers: state.offers.filter((o, i) =>
                    a.reduce((prevV, currV) => prevV && !(currV == i), true)
                )
            })
        default:
            return state
    }
}

export default rootReducer