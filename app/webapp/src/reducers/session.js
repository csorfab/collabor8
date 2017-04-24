export const session = (state = {}, action) => {
    switch(action.type){
        case 'RECEIVE_SESSION':
            return {
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
        default:
            return state
    }
}

export default session