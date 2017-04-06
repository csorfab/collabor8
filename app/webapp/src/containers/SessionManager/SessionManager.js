import React from 'react';
import { connect } from 'react-redux';
import { signedIn } from '../../actions'

class SessionManager extends React.Component {
  static propTypes = {
    
  }

  render() {
    const { session, onSignedIn } = this.props

    window.onGoogleSignIn = onSignedIn;
    
    return (
      <div>
        <div className="g-signin2" data-onsuccess="onGoogleSignIn"></div>
      { session.signedIn ? 'Signed in: ' + session.user.name : 'Signed out' } 
    </div>
    )  
  }
}

function mapStateToProps(state) {
  let session = state.session
  return { session }; // TODO
}

const mapDispatchToProps = (dispatch) => ({
  onSignedIn: (googleUser) => {
    let profile = googleUser.getBasicProfile()
    let user = {
      googleId: profile.getId(),
      name: profile.getName(),
      titles: 'MSc'
    }

    dispatch(signedIn(user))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionManager)
