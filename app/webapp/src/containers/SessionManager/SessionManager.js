import React from 'react';
import { connect } from 'react-redux';
import { authenticate, deleteSession, abortedSessionFetch } from '../../actions'

class SessionManager extends React.Component {
  static propTypes = {

  }

  managers = {}

  constructor(props) {
    super(props)

    let { managersDescriptor } = this.props

    for (let method in managersDescriptor) {
      this.registerManager(method, managersDescriptor[method])
    }
  }

  registerManager(method, managerDescriptor) {
    let { Class, params } = managerDescriptor

    this.managers[method] = {}      // this is needed because registerCallback expects the object to exist

    const manager = {
      ...managerDescriptor,
      instance: new Class(
        (action) => this.dispatch({ ...action, method }),
        params
      ),
      signedIn: false
    }

    this.managers[method] = {
      ...this.managers[method],
      ...manager
    }
  }

  dispatch(action) {
    switch (action.type) {
      case 'SIGN_IN':
        this.signIn(action.method)
        break;
      case 'SIGN_OUT':
        this.signOut()
        break;
      case 'MANAGER_SIGNED_IN':
        this.managerSignedIn(action.method, action.authToken)
        break;
      case 'MANAGER_SIGNED_OUT':
        this.managerSignedOut(action.method)
        break;
      case 'MANAGER_REGISTER_CALLBACK':
        this.registerCallback(action.method, action.callback)
        break;
    }
  }

  registerCallback(method, callback) {
    this.managers[method].callback = callback
  }

  executeCallback(method, action) {
    this.managers[method].callback(action)
  }

  managerSignedIn(method, authToken) {
    const { session, authenticate } = this.props

    this.managers[method].signedIn = true
    this.managers[method].authToken = authToken

    if (!session.signedIn) {
      authenticate(method, authToken)
    }
  }

  managerSignedOut(method) {
    const { deleteSession } = this.props

    this.managers[method].signedIn = false
    deleteSession()
  }

  signIn(method) {
    if (this.props.session.signedIn || this.props.session.isFetching) return

    if (!this.managers[method].signedIn)
      this.executeCallback(method, { type: 'SIGN_IN' })
    else
      this.props.authenticate(method, this.managers[method].authToken)
  }

  signOut() {
    const { session } = this.props
    const { method } = session.authInfo

    if (session.signedIn)
      this.executeCallback(method, { type: 'SIGN_OUT' })
  }

  advanceQueue(props) {
    const queue = props.session.actionQueue

    if (queue.length > 0) {
      const nextAction = queue[0]

      this.dispatch(nextAction)
      this.props.queuePop()
    }
  }

  componentWillReceiveProps(props) {
    this.advanceQueue(props)
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
