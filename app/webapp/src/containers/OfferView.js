import React from 'react'
import { connect } from 'react-redux'
import Offer, { blankOffer } from '../components/Offer'
import { fetchOffers, saveOffer } from '../actions'


function findOffer(id, offers) {
    return offers.items.reduce((prev, curr) => { return curr.id == id ? curr : prev }, false)
}

class OfferEdit extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.save = this.save.bind(this)
    //     this.handleChange = this.handleChange.bind(this)

    //     let { offerid } = props.match.params
    //     let action = props.reaction
    //     console.log(action)

    //     let offer = blankOffer()

    //     if (action !== 'new')
    //         offer = this.findOffer(offerid, props) || offer
    //     else
    //         offerid = -1

    //     this.state = {
    //         offer,
    //         offerid,
    //         action
    //     }
    // }


    componentDidMount() {
        this.props.fetchOffers()
    }

    render() {
        const { session, offer } = this.props

        const canEdit = session.signedIn && offer.user_id === session.user.id

        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <Offer offer={offer} view="full" editing={false} onSave={this.save} onChange={this.handleChange} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const { session, offers } = state
        
    return { session, offer: findOffer(props.match.params.offerid, offers) }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchOffers: () => {
            dispatch(fetchOffers())
        },
        saveOffer: (offer, callback) => {
            dispatch(saveOffer(offer, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferEdit)
