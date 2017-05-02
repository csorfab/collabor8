import React from 'react'
import GoogleOAuth2Manager from './containers/SessionManager/GoogleOAuth2Manager'
import SessionManager from './containers/SessionManager'

const GOOGLE_CLIENT_ID = '585712562710-cfb4erbilkj3pn7u1uo45ct78u5i7s4a.apps.googleusercontent.com'

export function Authenticate(props) {
    const managersDescriptor = {
        google: {
            Class: GoogleOAuth2Manager,
            params: GOOGLE_CLIENT_ID
        }
    }

    return (
        <SessionManager managersDescriptor={managersDescriptor} />
    )
}

export default Authenticate