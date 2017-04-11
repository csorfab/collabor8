import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import NavBar from './containers/Nav'
import SessionManager from './containers/SessionManager'
import UserEdit from './containers/UserEdit'
//      <Route path="/user/edit/" component={UserEdit} />



const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <NavBar>
          <SessionManager />
        </NavBar>
        <Switch>
          <Route path="/user" component={UserEdit} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;