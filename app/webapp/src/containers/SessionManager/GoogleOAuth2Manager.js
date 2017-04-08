import React from 'react';
import { connect } from 'react-redux';
//import { setGAuth2, updateAuthId } from './actions'

export class GoogleOAuth2Manager {
  // static propTypes = {
  //     statusChangedCallback: Protypes.func,
  //     registerCallback: Prototypes.func
  // }

  constructor(statusChangedCallback, registerCallback){
    this.statusChangedCallback = statusChangedCallback
 
    window.googleInit = this.getGoogleInit()
    window.jQuery.getScript('https://apis.google.com/js/platform.js?onload=googleInit')

    registerCallback('google', (action) => this.callback(action));
  }

  getGoogleInit() {
    const { statusChangedCallback } = this
    var that = this;

    return () => {
      let gapi = window.gapi

      gapi.load('auth2', function () {
        let auth2 = gapi.auth2.init({ client_id: '585712562710-cfb4erbilkj3pn7u1uo45ct78u5i7s4a.apps.googleusercontent.com' })
        
        auth2.isSignedIn.listen(() => { 
          if(auth2.isSignedIn.get()){
            let authId = auth2.currentUser.get().getAuthResponse().id_token;
            statusChangedCallback('google', authId)
          } else {
            statusChangedCallback('google', false)
          }
        })

        that.auth2 = auth2
      })
    }
  }  
  
  // fetchUser = () => {
  //   let googleUser = state.auth2.currentUser.get()
  //   let profile = googleUser.getBasicProfile()

  //   let user = {
  //     googleId: profile.getId(),
  //     authToken: googleUser.getAuthResponse().id_token,
  //     name: profile.getName(),
  //     titles: 'MSc'
  //   }

  //   console.log(user)
        
  //   return user
  // }

  callback(action){
    switch(action){
      case 'SIGN_IN':
        return this.auth2.signIn();
      case 'SIGN_OUT':
        return this.auth2.signOut();
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
