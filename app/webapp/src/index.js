import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import './css/bootstrap.css'
import './css/bootstrap-theme.css'
import './css/index.css'
import rootReducer from './reducers/index'
import Root from './Root'

const defaultState = {
  offers: [],
  session: {
    isFetching: false,
    signedIn: false
  }
}

let store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
  <Root store={store} />,  
  document.getElementById('root')
);
