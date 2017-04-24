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

function offers(state = [], action) {
    switch (action.type) {
        case 'UPDATE_OFFERS':
            return action.offers    
        case 'UPDATE_OFFER':
            return state.map(o => offer(o, action))
        case 'REMOVE_OFFER':
            return state.filter(offer => offer.id !== action.offer.id)    
        case ADD_OFFER:
            return [action.offer, ...state]
        default:
            return state
    }
}

export default offers