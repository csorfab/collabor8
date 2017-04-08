function sessionReducer(state, action) {
    switch(action){
        case 'UPDATE_SESSION':
            return action.session;
        default:
            return state;
    }
}