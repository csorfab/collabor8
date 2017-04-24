import React from 'react';
import { connect } from 'react-redux';
import { authenticate, deleteSession, abortedSessionFetch } from '../../actions'



import { Dropdown, FetchingIcon } from '../../components/Misc'
import { Link } from 'react-router-dom'


import GoogleOAuth2Manager from './GoogleOAuth2Manager'

const GOOGLE_CLIENT_ID = '585712562710-cfb4erbilkj3pn7u1uo45ct78u5i7s4a.apps.googleusercontent.com'




class SessionManager extends React.Component {
  static propTypes = {
    
  }

  callbacks = {}
  managers = {}

  statusChanged(method, authToken){
    const { authenticate, deleteSession } = this.props
    
    if(!authToken) return deleteSession()

    authenticate(method, authToken)
  }

  registerCallback(method, callback){
    this.callbacks[method] = callback
  }

  executeCallback(method, action){
    this.callbacks[method](action)
  }

  registerManager(id, Component, params) {
    let registerCallback = this.registerCallback.bind(this)
    let statusChanged = this.statusChanged.bind(this)
    
    this.managers[id] = new Component((authToken) => statusChanged(id, authToken), registerCallback, params)
  }

  componentDidMount() {
    this.registerManager('google', GoogleOAuth2Manager, GOOGLE_CLIENT_ID)
  }

  signIn(method){
    this.executeCallback(method, { type: 'SIGN_IN' })
  }

  signOut() {
    const { method } = this.props.session.authInfo
    this.executeCallback(method, { type: 'SIGN_OUT' })
  }

  render() {
    const { session } = this.props

    if(!session.signedIn){
      return (
        <li>
          <a href='#' onClick={() => this.signIn('google')}>
            <FetchingIcon isFetching={session.isFetching}>
              Sign in
            </FetchingIcon>
          </a>
        </li>
      )
    }

    return (
      <Dropdown title={<FetchingIcon isFetching={session.isFetching}>{session.user.name}</FetchingIcon>}>
        <li><Link to='/user'>Settings</Link></li>
        <li><a href='#' onClick={() => this.signOut()}>Sign out</a></li>
      </Dropdown>
    )  
  }
}

function mapStateToProps(state) {
  let { session } = state
  return { session };
}



const mapDispatchToProps = (dispatch) => ({
  authenticate: (method, authToken) => {
    dispatch(authenticate(method, authToken))
  },
  abortedSessionFetch: () => dispatch(abortedSessionFetch),
  deleteSession: (error) => dispatch(deleteSession(error))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionManager)
