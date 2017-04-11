import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import bootstrap_css from './css/bootstrap.css'
import bootstrap_theme from './css/bootstrap-theme.css'
import css from './css/index.css'
import rootReducer from './reducers/index'
import Root from './Root'

const defaultState = {
  offers: [],
  session: {
    signedIn: false,
    user: { }
  }
}

let store = createStore(rootReducer, defaultState)

ReactDOM.render(
  <Root store={store} />,  
  document.getElementById('root')
);
