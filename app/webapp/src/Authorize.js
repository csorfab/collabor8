import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'


const Authorize = ({ component: Component, signedIn, currentURL, ...rest }) => (
    <Route {...rest} render={(props) => (
        signedIn ?
            <Component {...props} />
            :
            <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }} />
    )} />
)

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
    return {
        signedIn: state.session.signedIn
    }
}

export default connect(mapStateToProps)(Authorize)