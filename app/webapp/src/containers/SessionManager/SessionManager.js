import React from 'react';
import { connect } from 'react-redux';
import { signedIn } from '../../actions'

class Link extends React.Component {
  render() {
    let { href, children, onClick } = this.props

    onClick = onClick || function(){ }
    href = href || '#'

    return (
      <a href={href} onClick={onClick}>{children}</a>
    )
  }
}

class Dropdown extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{title} <span className="caret"></span></a>
        <ul className="dropdown-menu">
          {children}
        </ul>
      </li>
    )
  }
}

class SessionManager extends React.Component {
  static propTypes = {
    
  }

  render() {
    const { session, onSignedIn } = this.props


    let $ = window.jQuery
    window.onGoogleSignIn = onSignedIn;


    if(!session.signedIn){
      return (
        <li>
          <Link onClick={() => $('.abcRioButton').click()}>Sign in</Link>
          <div className="g-signin2" data-onsuccess="onGoogleSignIn" style={{position: 'absolute', left: '-9999px'}}></div>
        </li>
      )
    }

    return (
      <Dropdown title={session.user.name}>
        <li><Link onClick={() => window.auth2.disconnect()}>Sign out</Link></li>
      </Dropdown>
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
