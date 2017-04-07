import { combineReducers } from 'redux'
import { ADD_OFFER, REMOVE_ALL_OFFERS, REMOVE_RANDOM_OFFERS, SIGNED_IN, LOGOUT, UPDATE_STATUS, SET_GAUTH2 } from '../actions'


const rootReducer = (state, action) => {
    let fetchUser = () => {
        let googleUser = state.auth2.currentUser.get()
        let profile = googleUser.getBasicProfile()

        let user = {
            googleId: profile.getId(),
            authToken: googleUser.getAuthResponse().id_token,
            name: profile.getName(),
            titles: 'MSc'
        }

        console.log(user)        
        
        return user
    }

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
}

export default rootReducer