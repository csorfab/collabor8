import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'


export function createStore() {
    const defaultState = {
        offers: {
            items: [],
            isFetching: false,
            didInvalidate: true
        },
        session: {
            signedIn: false,
            user: {},
            authInfo: {
                method: ''
            },
            actionQueue: [],
            isFetching: false
        },
        users: {
            items: [],
            isFetching: false,
            didInvalidate: true
        }
    }

    return reduxCreateStore(
        rootReducer,
        defaultState,
        applyMiddleware(thunkMiddleware)
    )
}

export default createStore