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
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">collabor8</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <SessionManager />
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="jumbotron">
                    <div className="container">
                        <h1>Hello, world!</h1>
                        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                        <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <button onClick={e => { e.preventDefault(); onAddClick() }}>Add new</button>
                        &nbsp;
                        <button onClick={e => {
                            e.preventDefault()
                            onRemoveAllClick()
                        }}>Remove random (1-3)
                        </button>
                    </div>
                    <Offers offers={offers} />

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
