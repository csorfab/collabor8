import React from 'react';

export class GoogleOAuth2Manager {
  constructor(statusChanged, registerAction, client_id) {
    this.statusChanged = statusChanged
    
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

    registerAction((action) => this.dispatch(action));
  }

  signedInListener() {
    const { auth2, statusChanged } = this

      if(auth2.isSignedIn.get()){
        let authToken = auth2.currentUser.get().getAuthResponse().id_token
        
        statusChanged(authToken)
      } else {
        statusChanged(false)
      }
  }

  view() {
    
  }

  dispatch(action){
    switch(action.type){
      case 'SIGN_IN':
        return this.auth2.signIn();
      case 'SIGN_OUT':
        return this.auth2.signOut();
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
