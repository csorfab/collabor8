import React, { Props } from 'react'
import { connect } from 'react-redux'
import { addRandomOffer, removeAllOffers, removeRandomOffers } from '../actions'
import Offers from '../components/Offers'
import SessionManager from '../containers/SessionManager/index'

class App extends React.Component {
    render() {
        const { offers, onAddClick, onRemoveAllClick } = this.props
        
        return (
            <div>
                <header className="navbar navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">Collabor8</div>
                        <nav className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li>How it works</li>
                                <li><SessionManager /></li>
                                <li>Request resource</li>
                                <li>Offer resource</li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <div className="container c8-main-box">
                    <h1>Access or share behavioral testing resources by collaborating with other researchers around the world.</h1>
                    <div className="container-fluid">
                        <div className="col-md-3">I'm looking for  test participants,</div>
                        <div className="col-md-3">Who are located in or available online</div>
                        <div className="col-md-3">Speaking any languages</div>
                    </div>
                </div>
                <button onClick={e => {
                    e.preventDefault()
                    onAddClick()
                }}>ADd new </button>
                <button onClick={e => {
                    e.preventDefault()
                    onRemoveAllClick()
                }}>ReMove aLL </button>
                <Offers offers={offers} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
