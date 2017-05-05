import React, { Props, PropTypes } from 'react';
import { connect } from 'react-redux';
import Offer, { blankOffer } from '../../components/Offer/index'
import { Link } from 'react-router-dom'
import { fetchOffers } from '../../actions'
import { FetchingIcon } from '../../components/Misc'
import { CSSTransitionGroup } from 'react-transition-group'

class OffersContainer extends React.Component {
  static propTypes = {
    filter: PropTypes.func
  }

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.fetchOffers()
  }


  render = () => {
    let { offers, session, isFetching, filter } = this.props

    if (!filter)
      filter = () => true

    return (
      <div>
        <div className="col-md-offset-2 col-md-9">
          <FetchingIcon isFetching={isFetching} color="white" />
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {offers.filter(filter).map((offer) => <Offer offer={offer} key={'OFFER_' + offer.id} onChange={this.changeHandler} view="item" />)}
          </CSSTransitionGroup>
        </div>
        <div>
          <div className="col-md-1">

          </div>
        </div>
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
