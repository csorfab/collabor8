function user(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            if(action.user.id === state.id)
                return action.user
            else
                return state    
        default:
            return state    
    }
}

function users(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case 'REQUEST_USERS':
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case 'RECEIVE_USERS':
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.users
            }    
        case 'UPDATE_USER':
            return {
                ...state,
                items: state.items.map(o => user(o, action))
            }
        default:
            return state
    }
}

export default users