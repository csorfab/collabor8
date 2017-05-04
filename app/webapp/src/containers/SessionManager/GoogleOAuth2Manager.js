import React from 'react';

export class GoogleOAuth2Manager {
  constructor(dispatch, client_id) {
    this.parentDispatch = dispatch

    window.googleInit = () => {
      let gapi = window.gapi

      gapi.load('auth2', () => {
        let auth2 = gapi.auth2.init({ client_id })

        auth2.isSignedIn.listen(() => {
          this.signedInListener();
        })

        this.auth2 = auth2
      })
    }

    window.jQuery.getScript('https://apis.google.com/js/platform.js?onload=googleInit')
    this.parentDispatch({ type: 'MANAGER_REGISTER_CALLBACK', callback: (action) => this.dispatch(action) });
  }

  signedInListener() {
    const { auth2, parentDispatch } = this

    if (auth2.isSignedIn.get()) {
      let authToken = auth2.currentUser.get().getAuthResponse().id_token

      parentDispatch({ type: 'MANAGER_SIGNED_IN', authToken })
    } else {
      parentDispatch({ type: 'MANAGER_SIGNED_OUT' })
    }
  }

  view() {

  }

  dispatch(action) {
    switch (action.type) {
      case 'SIGN_IN':
        this.auth2.signIn()
        break
      case 'SIGN_OUT':
        this.auth2.signOut()
        break
      default:
        break
    }
  }

  componentDidMount() {

  }

  render = () => (
    <div>
    </div>
  )
}

export default GoogleOAuth2Manager
