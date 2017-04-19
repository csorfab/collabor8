import React, { Props } from 'react'
import { connect } from 'react-redux'
import { addRandomOffer, removeAllOffers, removeRandomOffers } from '../actions'
import Offers from '../components/Offers'
import SessionManager from '../containers/SessionManager/index'

class UserEdit extends React.Component {
    render() {
        const { session, onAddClick, onRemoveAllClick } = this.props

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
        onAddClick: () => {
            dispatch(addRandomOffer())
        },
        onRemoveAllClick: () => {
            dispatch(removeRandomOffers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
