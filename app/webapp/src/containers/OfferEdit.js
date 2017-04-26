import React from 'react'
import { connect } from 'react-redux'
import Offer, { blankOffer } from '../components/Offer'
import { fetchOffers, saveOffer } from '../actions'


class OfferEdit extends React.Component {
    state = {}
    
    save(offer) {
        const { saveOffer } = this.props
        saveOffer(offer, (offer) => {
            if (offer)
                this.props.history.push('/offer/view/' + offer.id)
        })
    }

    constructor(props) {
        super(props)
        this.save = this.save.bind(this)

        const { offers, session } = props
        let { offerid, action } = props.match.params        
        let offer = blankOffer()

        console.log(offerid, action)        

                
        
        if (action !== 'new')
            offer = this.findOffer(offerid, props) || offer
        else
            offerid = -1
        
        this.state = {
            offer,
            action
        }
    }

    findOffer(id, props) {
        const { offers } = props
        let offer = offers.items.reduce((prev, curr) => { return curr.id == id ? curr : prev }, false)

        return offer
    }    

    componentDidMount() {
        this.props.fetchOffers()
    }

    componentWillReceiveProps(props) {
        let offer = this.findOffer(this.state.offerid, props)

        if (offer) {
            this.setState({ offer })
        } else {
            this.setState({
                offer: {
                    ...this.state.offer,
                    user: props.session.user
                }
            })
        }
    }

    render() {
        const { action } = this.props.match.params
        const { session } = this.props
        const { offer } = this.state
        

        const canEdit = session.signedIn && offer.user_id === session.user.id
        const editing = !(action === 'view')

        return (           
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <Offer offer={offer} editing={editing} onSave={this.save} />
                    </div>
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { session, offers } = state
    
    return { session, offers }
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
