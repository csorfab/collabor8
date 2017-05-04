import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

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
        composeWithDevTools( applyMiddleware(thunkMiddleware) )
    )
}

export default createStore