import React from 'react';
import { connect } from 'react-redux';
import { signedIn, logout, updateStatus, setGAuth2 } from '../../actions'

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

  getGoogleInit(updateStatus, setGAuth2) {
    return () => {
      let gapi = window.gapi

      gapi.load('auth2', function () {
        let auth2 = gapi.auth2.init({ client_id: '585712562710-cfb4erbilkj3pn7u1uo45ct78u5i7s4a.apps.googleusercontent.com' })
        auth2.isSignedIn.listen(updateStatus)
        setGAuth2(auth2)
      });
    }
  }

  
  
  componentDidMount() {
    const { updateStatus, setGAuth2 } = this.props

    window.googleInit = this.getGoogleInit(updateStatus, setGAuth2)
    window.jQuery.getScript('https://apis.google.com/js/platform.js?onload=googleInit')
  }

  render() {
    const { session, updateStatus, auth2 } = this.props

    let signIn = () => auth2.signIn()
    let signOut = () => auth2.signOut()

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
  let { session, auth2 } = state
  return { session, auth2 }; // TODO
}

const fetchUser = () => {
  let googleUser = state.auth2.currentUser.get()
  let profile = googleUser.getBasicProfile()

  let user = {
    googleId: profile.getId(),
    authToken: googleUser.getAuthResponse().id_token,
    name: profile.getName(),
    titles: 'MSc'
  }

  console.log(user)
      
  return user
}

const mapDispatchToProps = (dispatch) => ({
  updateStatus: () => {
    dispatch(updateStatus())
  },
  setGAuth2: (auth2) => {
    dispatch(setGAuth2(auth2))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionManager)
