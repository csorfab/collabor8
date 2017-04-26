import React from 'react';
import { connect } from 'react-redux';
import { authenticate, deleteSession, abortedSessionFetch } from '../../actions'

class SessionManager extends React.Component {
  static propTypes = {

  }

  callbacks = {}
  managers = {}
  
  componentWillReceiveProps(props) {
    const queue = props.session.actionQueue
    
    if (queue.length > 0) {
      const nextAction = queue[0]
      this.executeCallback(nextAction.method, nextAction)
      this.props.queuePop()
    }
  }

  statusChanged(method, authToken) {
    const { authenticate, deleteSession } = this.props

    if (!authToken) return deleteSession()

    authenticate(method, authToken)
  }

  registerCallback(method, callback) {
    this.managers[method].callback = callback
  }

  executeCallback(method, action) {
    this.managers[method].callback(action)
  }

  registerManager(method, managerDescriptor) {
    let { Class, params } = managerDescriptor

    this.managers[method] = managerDescriptor
    this.managers[method].instance = new Class(
      (authToken) => this.statusChanged(method, authToken),
      (callback) => this.registerCallback(method, callback),
      params
    )
  }

  componentDidMount() {
    let { managersDescriptor } = this.props

    for (let method in managersDescriptor) {
      this.registerManager(method, managersDescriptor[method])
    }
  }

  signIn(method) {
    this.executeCallback(method, { type: 'SIGN_IN' })
  }

  signOut() {
    const { method } = this.props.session.authInfo
    this.executeCallback(method, { type: 'SIGN_OUT' })
  }

  render() {
    return null
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
  queuePop: () => dispatch({ type: 'POP_SESSION_ACTION' }),
  abortedSessionFetch: () => dispatch(abortedSessionFetch),
  deleteSession: (error) => dispatch(deleteSession(error))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionManager)
