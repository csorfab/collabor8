import React from 'react';
import { connect } from 'react-redux';
import { authenticate, deleteSession, abortedSessionFetch } from '../../actions'
import { Dropdown, FetchingIcon } from '../../components/Misc'
import { Link } from 'react-router-dom'

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

  registerManager(id, manager) {
    let { Class, params } = manager
    this.managers[id] = new Class((authToken) => this.statusChanged(id, authToken), (callback) => this.registerCallback(id, callback), params)
  }

  componentDidMount() {
    let managers = this.props.managersDescriptor

    for (let id in managers) {
      // if (!managers.hasOwnProperty(id)) continue;

      this.registerManager(id, managers[id])
    }
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
        <li><Link to={'/user/' + session.user.id}>Settings</Link></li>
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
