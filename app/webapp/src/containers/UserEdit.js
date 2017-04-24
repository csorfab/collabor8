import React from 'react'
import { connect } from 'react-redux'

class UserEdit extends React.Component {
    render() {
        const { session } = this.props

        if (!session.signedIn) {
            return (
                <div>
                    User not logged in
                </div>
            )
        }        
    
        return (
            <div>
                {session.user.name}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { session } = state

    return { session }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
