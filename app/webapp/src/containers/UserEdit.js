import React, { Props } from 'react'
import { connect } from 'react-redux'
import { addRandomOffer, removeAllOffers, removeRandomOffers } from '../actions'
import Offers from '../components/Offers'
import SessionManager from '../containers/SessionManager/index'

class UserEdit extends React.Component {
    render() {
        const { offers, onAddClick, onRemoveAllClick } = this.props

        return (
            <div>
            JuzertEdit
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { offers } = state

    return { offers }
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
