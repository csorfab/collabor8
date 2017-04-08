export const sessionReducer = (state = {}, action) => {
    switch(action.type){
        case 'UPDATE_SESSION':
            return action.session;
        default:
            return state;
    }
}

export default sessionReducer