import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SessionView from './components/SessionView'
import UserEdit from './containers/UserEdit'
import OfferEdit from './containers/OfferEdit'
import NavBar from './containers/Nav'
import Auth from './Auth'
import Index from './containers/Index'

class App extends React.Component {
    render() {
        return (
            <div>
                <Auth />
                <Router>
                    <div>
                        <NavBar>
                            <SessionView
                                session={this.props.session}
                                onSignIn={this.props.signIn}
                                onSignOut={this.props.signOut}
                            />
                        </NavBar>
                        <Switch>
                            <Route path="/user/:userid" component={UserEdit} />
                            <Route path="/offer/:action/:offerid" component={OfferEdit} />
                            <Route path="/offer/:action" component={OfferEdit} />
                            <Route path="/" component={Index} />
                        </Switch>
                        <hr />
                        <footer>
                            <p>&copy; 2016 Company, Inc.</p>
                        </footer>
                    </div>
                </Router>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { session } = state
    return { session }
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: (method) => dispatch({
            type: 'PUSH_SESSION_ACTION',
            action: { type: 'SIGN_IN', method }
        }),
        signOut: (method) => dispatch({
            type: 'PUSH_SESSION_ACTION',
            action: { type: 'SIGN_OUT', method }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
