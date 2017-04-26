import React, { Props, PropTypes } from 'react';
import { connect } from 'react-redux';
import Offer, { blankOffer } from '../../components/Offer/index'
import { Link } from 'react-router-dom'
import { fetchOffers } from '../../actions'
import { FetchingIcon } from '../../components/Misc'

class OffersContainer extends React.Component {
  static propTypes = {
    filter: PropTypes.func
  }

  constructor(props) {
    super(props)
    // this.changeHandler = this.changeHandler.bind(this)
    // this.saveNewOffer = this.saveNewOffer.bind(this)
    // this.cancelNewOffer = this.cancelNewOffer.bind(this)
  }

  state = { creating: false }

  componentDidMount() {
    this.props.fetchOffers()
  }


  cancelNewOffer() {
    const { setCreating } = this.props
    setCreating(false)
  }

  saveOffer(newOffer) {
    // TODO
  }

  render = () => {
    let { offers, session, isFetching, isCreating, filter, creatingItem } = this.props
    const { createNewOffer, saveNewOffer, cancelNewOffer, changeHandler } = this    

    if (!filter)
      filter = () => true  
    
    return (
      <div>
        <div className="offerEditor">
          {
            session.signedIn ? 
              isCreating ? 
                <Offer offer={creatingItem} onChange={saveNewOffer}  onCancel={cancelNewOffer} editing={true} />
              :
                <Link to="/offer/new" className="btn btn-default">New offer</Link>
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
  fetchOffers: () => {
    dispatch(fetchOffers())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OffersContainer);
