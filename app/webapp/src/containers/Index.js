import React from 'react'
import { connect } from 'react-redux'
import OffersContainer from './OffersContainer/index'
import { Link } from 'react-router-dom'
import Field from '../components/Field'
import { objReduce } from '../components/Misc'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    filters = {}
    state = {}
    
    getFilter() {
        const { computeDistanceBetween } = window.google.maps.geometry.spherical
        const { LatLng } = window.google.maps
        const { state, filters } = this
        
        filters.location =
            (state.radius && state.location)
            ? offer =>
                computeDistanceBetween(
                    new LatLng({ lat: Number(offer.location.location.lat), lng: Number(offer.location.location.lng) }),
                    new LatLng({ lat: Number(state.location.location.lat), lng: Number(state.location.location.lng) }),
                ) < state.radius * 1000 
            : undefined
        
        filters.participants = (state.minParticipants) ? offer => offer.numberOfParticipants >= state.minParticipants : undefined

        console.log(filters)        
        
        return (offer => objReduce(filters, (prev, filter) => typeof filter === 'undefined' ? prev : filter(offer) ? prev : false, true))
    }

    handleChange(event) {
        const { name, value } = event
        
        this.setState({ [name]: value })
    }

    render() {
        const { offers } = this.props
        const filter = this.getFilter()
        
        return (

            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1>Access or share behavioral testing resources by collaborating with other researchers around the world.</h1>
                        <div className="landingMainFilter col-md-9 col-md-offset-2">
                            <p>I'm looking for test participants</p>
                            <p>
                                located near
                                <Field
                                    type="geosuggest"
                                    name="location"
                                    onChange={this.handleChange}
                                    inputClass="form-control landingMainLocation"
                                    editable={true}
                                />
                                <Field
                                    type="number"
                                    name="radius"
                                    onChange={this.handleChange}
                                    inputClass="form-control landingMainLocation"
                                    editable={true}
                                    placeholder="Radius (km)"
                                />
                                <Field
                                    type="number"
                                    name="minParticipants"
                                    onChange={this.handleChange}
                                    inputClass="form-control landingMainLocation"
                                    editable={true}
                                    placeholder="Minimum number of participants"
                                />
                            </p>
                             <p><button className="btn btn-primary btn-lg" role="button">Learn more &raquo;</button></p>
                        </div>
                       
                    </div>
                </div>

                <div className="container">
                    <OffersContainer offers={offers} filter={filter} />
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
