import { combineReducers } from 'redux'
import { ADD_OFFER, REMOVE_ALL_OFFERS, REMOVE_RANDOM_OFFERS, SIGNED_IN, LOGOUT, UPDATE_STATUS, SET_GAUTH2 } from '../actions'

import { sessionReducer } from '../containers/SessionManager/reducer.js'


/*const rootReducer = (state, action) => {
    state = Object.assign({}, state, { session: sessionReducer(state, action)} )

    switch (action.type) {
        case SET_GAUTH2:
            return Object.assign({}, state, { auth2: action.auth2 })
        case UPDATE_STATUS:
            if(state.auth2 === undefined)
                return Object.assign({}, state, {session: {
                    signedIn: false,
                    user: {}
                }})

            let isSignedIn = state.auth2.isSignedIn.get()
            if(isSignedIn == state.session.signedIn) return state

            return Object.assign({}, state, {
                session: isSignedIn ?
                {
                    signedIn: true,
                    user: fetchUser()
                }
                :
                {
                    signedIn: false,
                    user: {}
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
}*/

const rootReducer = combineReducers({
    session: sessionReducer,
    offers: offerReducer
});

export default rootReducer