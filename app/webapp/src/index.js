import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './createStore'
import Root from './Root'

const store = createStore()

ReactDOM.render(
  <Root store={store} />,  
  document.getElementById('root')
);
