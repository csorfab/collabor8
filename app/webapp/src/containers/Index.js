import React from 'react'
import { connect } from 'react-redux'
import OffersContainer from './OffersContainer/index'
import { Link } from 'react-router-dom'
import Field from '../components/Field'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        
    }

    render() {
        const { offers } = this.props
        
        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1>Access or share behavioral testing resources by collaborating with other researchers around the world.</h1>
                        <div className="landingMainFilter col-md-9 col-md-offset-2">
                            <p>I'm looking for test participants</p>
                            <p>
                                located near
                                <input type="date" />
                                <Field type="geosuggest"
                                    name="location"
                                    onChange={this.handleChange}
                                    inputClass="form-control landingMainLocation"
                                    editable={true}
                                />    
                            </p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index)
