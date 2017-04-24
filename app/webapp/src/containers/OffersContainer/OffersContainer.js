import React, { Props, PropTypes } from 'react';
import { connect } from 'react-redux';
import Offer, { blankOffer } from '../../components/Offer/index'
import { ajaxRequest } from '../../ajax'
import { fetchOffers } from '../../actions'
import { FetchingIcon } from '../../components/Misc'

class OffersContainer extends React.Component {
  static propTypes = {
    filter: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.changeHandler = this.changeHandler.bind(this)
    this.createOffer = this.createOffer.bind(this)
    this.saveNewOffer = this.saveNewOffer.bind(this)
    this.cancelNewOffer = this.cancelNewOffer.bind(this)
  }

  state = { creating: false }

  componentDidMount() {
    this.props.fetchOffers()
  }

  createOffer() {
    this.setState({
      creating: true,
      newOffer: Object.assign(blankOffer(), {user: this.props.session.user})
    })
  }

  saveNewOffer(offer) {
    var that = this

    ajaxRequest('/offer/new', this.props.authInfo, {
      data: { offer },
      success: (offer) => {
        that.props.addOffer(offer)
        that.setState({ creating: false })
      },
      error: () => {
        // TODO error handling.
      }
    })
  }

  cancelNewOffer() {
    this.setState({ creating: false })
  }

  changeHandler(newOffer) {
    ajaxRequest('/offer/update', this.props.authInfo, {
      data: { offer: newOffer },
      success: (offer) => {
        this.props.updateOffer(offer)
      },
      error: () => {
        // TODO error handling.
      }
    })
  }

  render = () => {
    let { offers, session, isFetching, filter } = this.props
    const { createOffer, saveNewOffer, cancelNewOffer } = this    

    if (!filter)
      filter = () => true  
    
    return (
      <div>
        <div className="offerEditor">
          {
            session.signedIn ? 
              this.state.creating ? 
                <Offer offer={this.state.newOffer} onChange={saveNewOffer} onCancel={cancelNewOffer} editing={true} />
              :
                <button onClick={createOffer}>New offer</button>
            :
            <span>Not logged in</span>
          }
        </div>  
        
        <FetchingIcon isFetching={isFetching} color="white" />
        {offers.filter(filter).map((offer) => <Offer offer={offer} key={'OFFER_' + offer.id} onChange={this.changeHandler} editing={false} />)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  offers: state.offers.items,
  isFetching: state.offers.isFetching,
  authInfo: state.session.authInfo,
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  updateOffer: (offer) => {
    dispatch({
      type: 'UPDATE_OFFER',
      offer
    })
  },
  fetchOffers: () => {
    dispatch(fetchOffers())
  },
  addOffer: (offer) => {
    dispatch({
      type: 'ADD_OFFER',
      offer
    })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OffersContainer);
