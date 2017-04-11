import React, { Props } from 'react'
import { connect } from 'react-redux'
import { addRandomOffer, removeAllOffers, removeRandomOffers } from '../actions'
import OffersContainer from './OffersContainer/index'
import { Link } from 'react-router-dom'

class App extends React.Component {
    render() {
        const { offers, onAddClick, onRemoveAllClick, user } = this.props
        
        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1>Hello, world!</h1>
                        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                        <p><Link className="btn btn-primary btn-lg" to="/user/edit" role="button">Learn more &raquo;</Link></p>
                    </div>
                </div>

                <div className="container">
                    <OffersContainer offers={offers} />
                    <hr />
                    <footer>
                        <p>&copy; 2016 Company, Inc.</p>
                    </footer>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { offers } = state
    const user = state.session.user

    return { offers, user }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddClick: (user) => {
            dispatch(addRandomOffer(user))
        },
        onRemoveAllClick: () => {
            dispatch(removeRandomOffers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
