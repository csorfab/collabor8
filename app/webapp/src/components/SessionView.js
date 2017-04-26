import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, FetchingIcon } from './Misc'

export class SessionView extends React.Component {
    static propTypes = {
        session: PropTypes.object.isRequired,
        onSignIn: PropTypes.func.isRequired,
        onSignOut: PropTypes.func.isRequired
    }

    renderSignedIn() {
        const { session, onSignOut } = this.props

        return (
            <Dropdown title={<FetchingIcon isFetching={session.isFetching}>{session.user.name}</FetchingIcon>}>
                <li><Link to={'/user/' + session.user.id}>Settings</Link></li>
                <li><a href='#' onClick={() => onSignOut(session.authInfo.method)}>Sign out</a></li>
            </Dropdown>
        )
    }

    renderSignedOut() {
        const { session, onSignIn } = this.props

        return (
            <Dropdown title={<FetchingIcon isFetching={session.isFetching}>Sign in</FetchingIcon>}>
                <li>
                    <Link onClick={() => onSignIn('google')} to="#">Google</Link>
                </li>
                <li>
                    <form style={{ margin: '10px' }}>
                        <div className="form-group">
                            <input className="form-control" placeholder="E-mail" type="text" />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Password" type="password" />
                        </div>
                        <button className="btn btn-default">Login</button>
                    </form>
                </li>
            </Dropdown>
        )
    }

    render() {
        const { session } = this.props

        return session.signedIn
            ? this.renderSignedIn()
            : this.renderSignedOut()
    }
}

export default SessionView