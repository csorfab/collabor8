import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import SessionView from './components/SessionView'
import NavBar from './containers/Nav'
import Authenticate from './Authenticate'
import Routes from './Routes'
import './css/bootstrap.css'
import './css/bootstrap-theme.css'
import './css/index.css'

class App extends React.Component {
    render() {
        return (
            <div>
                <Authenticate />
                <Router>
                    <div>
                        <NavBar>
                            <SessionView
                                session={this.props.session}
                                onSignIn={this.props.signIn}
                                onSignOut={this.props.signOut}
                            />
                        </NavBar>
                        <Routes />
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
