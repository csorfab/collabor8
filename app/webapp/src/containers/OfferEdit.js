import React from 'react'
import { connect } from 'react-redux'
import Offer, { blankOffer } from '../components/Offer'
import { fetchOffers, saveOffer } from '../actions'
import { findOffer } from '../components/Offers'

class OfferEdit extends React.Component {
    state = {}
    
    save() {
        const { saveOffer } = this.props
        const { offer } = this.state

        console.log(offer)

        saveOffer(offer, (offer) => {   // callback hack (?)
            if (offer)
                this.props.history.push('/offer/view/' + offer.id)
        })
    }

    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = this.receiveOfferid(props)
    }

    receiveOfferid(props) {
        const offerid = props.match.params.offerid || -1
        const offer = props.offer || blankOffer(props.session)   
        
        return {offer, offerid}
    }

    handleChange(event) {
        const { name, value } = event

        this.setState({
            offer: {
                ...this.state.offer,
                [name]: value
            }
        });
    }

    componentDidMount() {
        this.props.fetchOffers()
    }

    componentWillReceiveProps(props) {
        const { offer, session } = props

        if (props.match.params.offerid !== this.state.offerid) {
            this.setState(this.receiveOfferid(props))
        }        
        
        if (offer && (offer.id !== this.state.offer.id)) {
            this.setState({ offer })
        }

        if (session.signedIn && this.state.offerid == -1) {
            this.setState({
                offer: {
                    ...this.state.offer,
                    user_id: session.user.id,
                    user: session.user
                }
            })
        }
    }

    render() {
        const { session } = this.props
        const { offer, offerid } = this.state
        
        const canEdit = session.signedIn && offer.user_id === session.user.id

        if (!canEdit)
            return 'permission denied'    
        
        return (           
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1>{offerid == -1 ? 'Post a new resource offer' : 'Edit your resource offer'}</h1>
                        <Offer offer={offer} view="full" editing={true} onSave={this.save} onChange={this.handleChange} />
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
