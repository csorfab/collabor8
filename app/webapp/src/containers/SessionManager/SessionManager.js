import React from 'react';
import { connect } from 'react-redux';
//import { signedIn, logout, updateStatus, setGAuth2 } from '../../actions'
import { ajaxRequest } from '../../ajax'
import { updateSession, deleteSession } from './actions'
import { Link, Dropdown } from './Misc'
import { GoogleOAuth2Manager } from './GoogleOAuth2Manager'


class SessionManager extends React.Component {
  static propTypes = {
    
  }

  callbacks = []



  statusChangedCallback(method, authId){
    const { updateSession } = this.props
    
    if(!authId) return deleteSession()


    ajaxRequest('/authenticate', {method, authId}, { 
      success: (data) => {
        updateSession(method, authId, data)
      }, 
      
      error: (x, error) => {
        deleteSession(error)
      }
    });
  }

  registerCallback(method, callback){
    this.callbacks[method] = callback
  }

  executeCallback(action, method){
    const { session } = this.props

    this.callbacks[method](action)
  }

  componentDidMount(){
    let registerCallbackWrapped = (method, callback) => this.registerCallback(method, callback)
    let statusChangedCallbackWrapped = (method, authId) => this.statusChangedCallback(method, authId)

    this.callbacks = []
    this.googleOAuth2Manager = new GoogleOAuth2Manager(statusChangedCallbackWrapped, registerCallbackWrapped)
  }

  signIn(method){
    this.executeCallback('SIGN_IN', method)
  }

  signOut(method){
    this.executeCallback('SIGN_OUT', method)
  }

  render() {
    const { session } = this.props

    // let signIn = () => auth2.signIn()
    // let signOut = () => auth2.signOut()

    if(!session.signedIn){
      return (
        <li>
          <Link onClick={() => this.signIn('google')}>Sign in</Link>
        </li>
      )
    }

    return (
      <Dropdown title={session.user.name}>
        <li><Link onClick={() => this.signOut('google')}>Sign out</Link></li>
      </Dropdown>
    )  
  }
}

function mapStateToProps(state) {
  let { session } = state
  return { session };
}



const mapDispatchToProps = (dispatch) => ({
  updateSession: (method, authId, data, signedin, error) => {
    dispatch(updateSession(method, authId, data, signedin, error))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionManager)
