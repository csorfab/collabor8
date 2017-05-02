import React from 'react'
import { connect } from 'react-redux'


class Authorize extends React.Component {
    componentDidMount() {
        const { dispatch, currentURL, history, isLoggedIn } = this.props

        if (!isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            dispatch({ type: 'SET_REDIR_URL', url: currentURL })
            this.props.history.push("/login")
        }
    }

    render() {
        const { isLoggedIn } = this.props

        if (isLoggedIn) {
            return (
                 <div>
                    {this.props.children}
                </div>    
            )
        } else {
            return null
        }
    }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.session.signedIn,
        currentURL: ownProps.location.pathname
    }
}

export default connect(mapStateToProps)(Authorize)