import React from 'react'
import { connect } from 'react-redux'
import OffersContainer from './OffersContainer/index'
import { Link } from 'react-router-dom'

class App extends React.Component {
    render() {
        const { offers } = this.props
        
        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1>Hello, world!</h1>
                        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                        <p><Link className="btn btn-primary btn-lg" to="/" role="button">Learn more &raquo;</Link></p>
                    </div>
                </div>

                <div className="container">
                    <OffersContainer offers={offers} />
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
