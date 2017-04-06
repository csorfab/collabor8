import React from 'react';
import { connect } from 'react-redux';
import { signedIn, logout } from '../../actions'

class Link extends React.Component {
  render() {
    let { id, href, children, onClick } = this.props

    onClick = onClick || function(){ }
    href = href || '#'



    return (
      <a id={id} href={href} onClick={onClick}>{children}</a>
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
    const { session, onSignedIn, onLogoutClick } = this.props
    let login = () => window.auth2.signIn().then(onSignedIn).catch((e) => console.log(e))
    
    if(!session.signedIn){
      return (
        <li>
          <Link onClick={login}>Sign in</Link>
        </li>
      )
    }

    return (
      <Dropdown title={session.user.name}>
        <li><Link onClick={onLogoutClick}>Sign out</Link></li>
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
  },

  onLogoutClick: (e) => {
    e.preventDefault()
    window.auth2.signOut()

    dispatch(logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionManager)
