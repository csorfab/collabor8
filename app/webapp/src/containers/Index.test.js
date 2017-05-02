import { Provider } from 'react-redux'
import createStore from '../createStore'
import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index';

const store = createStore()

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Index store={store}/>, div);
});
