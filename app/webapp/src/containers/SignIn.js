import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const SignIn = function (props) {
    if (props.session.signedIn) {
        const { from } = props.location.state || { from: { pathname: '/' } }

        return (
            <Redirect to={from}/>
        )
    }
    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1>Sign In<br /><br />
                        <button className="btn btn-primary btn-lg" onClick={() => props.signin('google')}>Log in with Google</button>
                    </h1>    
                </div>
            </div>
        </div>
    )
}

export default connect(
    state => ({
        session: state.session    
    }),
    dispatch => ({
        signin: method => dispatch({ type: 'PUSH_SESSION_ACTION', action: { type: 'SIGN_IN', method } })
    })
)(SignIn)