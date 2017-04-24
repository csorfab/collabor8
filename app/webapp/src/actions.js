import ajaxRequest from './ajax'

export const ADD_OFFER = 'ADD_OFFER'

export const requestSession = () => ({
    type: 'REQUEST_SESSION'
})

export const receiveSession = (authInfo, user, signedIn = true, error) => ({
    type: 'RECEIVE_SESSION',
    session: {
        authInfo,
        signedIn,
        user,
        error
    }
})

export const abortedSessionFetch = () => ({
    type: 'ABORTED_SESSION_FETCH'
})

export function authenticate(method, authToken) {
    let authInfo = { method, authToken }
    
    return dispatch => {
        dispatch(requestSession())
        ajaxRequest('/authenticate', authInfo, { 
            success: (data) => {
                dispatch(receiveSession(authInfo, data))
            }, 
            
            error: (x, error) => {
                dispatch(abortedSessionFetch())
                // deleteSession(error)
                // no need to delete after a failed authentication attempt with server
            }
        })
    }
} 

export function deleteSession(error) {
    return dispatch => {
        dispatch(requestSession())
        setTimeout(() => dispatch(receiveSession({}, {}, false, error)), 500)
        // delay csak a moka kedveert, ill igy erzi a juzer, hogy tortent valami:)
    }
}

const receiveOffers = (offers) => ({
    type: 'RECEIVE_OFFERS',
    offers
})

const requestOffers = () => ({ type: 'REQUEST_OFFERS' })

export function fetchOffers() {
    return (dispatch, getState) => {        
        dispatch(requestOffers())
        ajaxRequest('/offer/list', getState().session.authInfo, {
            success: (offers) => {
                dispatch(receiveOffers(offers))
            }
        })
    }    
}

const receiveUsers = (users) => ({
    type: 'RECEIVE_USERS',
    users
})

const requestUsers = () => ({ type: 'REQUEST_USERS' })

export function fetchUsers() {
    return (dispatch, getState) => {        
        dispatch(requestUsers())
        ajaxRequest('/user/list', getState().session.authInfo, {
            success: (users) => {
                dispatch(receiveUsers(users))
            }
        })
    }    
}

// export function deleteSession(error) {
    
//     return receiveSession({}, {}, false, error)
// }

// var offerId = 1

// export function addRandomOffer(user) {
//     return {
//         type: ADD_OFFER,
//         offer: {
//             id: -1,
//             numberOfParticipants: Math.ceil(Math.random()*100),
//             description: "We are offering 120 english speaking psychology BA students as \
//                 participants for experiments.",
//             availabilityFrom: "2017-03-02",
//             availabilityTill: "2018-03-02",
//             locationString: "Budapest, Hungary",
//             languages: "Hungarian (native), Englsh",
//             online: true,
//             lab: true,
//             field: false,
//             type: 'pay',
//             user
//         }
//     }
// }