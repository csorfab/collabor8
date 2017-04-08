import React from 'react';
import { connect } from 'react-redux';
//import { signedIn, logout, updateStatus, setGAuth2 } from '../../actions'
import { updateSession } from './actions'
import { Link, Dropdown } from './Misc'

class SessionManager extends React.Component {
  static propTypes = {
    
  }

  callbacks = []

  statusChangedCallback(method, authId){
    const $ = window.jQuery
    const { updateSession } = this.props
    
    $.ajax('/authenticate/' + method + '/' + authId, { success: (data) => {
      let session = {
        authInfo: {
          method,
          authId
        },
        user: data
      }

      updateSession(session)
    }});
  }

  registerCallback(method, callback){
    callbacks[method] = callback
  }

  executeCallback(action){
    const { session } = this.props

    callbacks[session.authInfo.method](action)
  }

  signIn(){
    executeCallback('SIGN_IN')
  }

  signOut(){
    executeCallback('SIGN_OUT')
  }

  render() {
    const { session } = this.props

    // let signIn = () => auth2.signIn()
    // let signOut = () => auth2.signOut()

    if(!session.signedIn){
      return (
        <li>
          <Link onClick={signIn}>Sign in</Link>
        </li>
      )
    }

    return (
      <Dropdown title={session.user.name}>
        <li><Link onClick={signOut}>Sign out</Link></li>
      </Dropdown>
    )  
  }
}

function mapStateToProps(state) {
  let { session } = state
  return { session };
}



const mapDispatchToProps = (dispatch) => ({
  updateSession: (session) => {
    dispatch(updateSession(session))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionManager)
