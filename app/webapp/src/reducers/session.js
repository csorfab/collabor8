export const session = (state = {
    signedIn: false,
    user: {},
    authInfo: {
        method: '',
        authToken: ''
    },
    isFetching: false,
    actionQueue: [],
    redirURL: ''
}, action) => {
    switch(action.type){
        case 'RECEIVE_SESSION':
            return {
                ...state,
                ...action.session,
                isFetching: false
            }
        case 'REQUEST_SESSION':
            return {
                ...state,
                isFetching: true
            }
        case 'ABORTED_SESSION_FETCH':
            return {
                ...state,
                isFetching: false
            }
        case 'PUSH_SESSION_ACTION':
            return {
                ...state,
                actionQueue: [...state.actionQueue, action.action]
            }
        case 'POP_SESSION_ACTION':
            return {
                ...state,
                actionQueue: state.actionQueue.filter((v, i) => i !== 0)
            }    
        case 'SET_REDIR_URL':
            return {
                ...state,
                redirURL: action.url
            }    
        default:
            return state
    }
}

export default session