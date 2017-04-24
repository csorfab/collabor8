import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import NavBar from './containers/Nav'
import UserEdit from './containers/UserEdit'
import Auth from './Auth'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <NavBar>
          <Auth />
        </NavBar>
        <Switch>
          <Route path="/user/:userid" component={UserEdit} />
          <Route path="/" component={App} />
        </Switch>
                <hr />
        <footer>
            <p>&copy; 2016 Company, Inc.</p>
        </footer>
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;