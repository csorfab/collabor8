import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App';
import bootstrap_css from './css/bootstrap.css'
import bootstrap_theme from './css/bootstrap-theme.css'
import css from './css/index.css'
import rootReducer from './reducers/index'

const defaultState = {
  offers: [],
  session: {
    signedIn: false,
    user: { }
  }
}

let store = createStore(rootReducer, defaultState)



ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),  
  document.getElementById('root')
);
