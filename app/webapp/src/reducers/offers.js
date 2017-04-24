import { ADD_OFFER } from '../actions'


function offer(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_OFFER':
            if(action.offer.id === state.id)
                return action.offer
            else
                return state    
        default:
            return state    
    }
}

function offers(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case 'REQUEST_OFFERS':
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case 'RECEIVE_OFFERS':
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.offers
            }    
        case 'UPDATE_OFFER':
            return {
                ...state,
                items: state.items.map(o => offer(o, action))
            }
        case 'REMOVE_OFFER':
            return {
                ...state,
                items: state.items.filter(offer => offer.id !== action.offer.id)
            }
        case ADD_OFFER:
            return {
                ...state,
                items: [action.offer, ...state.items]
            }
        default:
            return state
    }
}

export default offers