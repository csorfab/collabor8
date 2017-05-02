import React, { Props } from 'react'
import Offer from './Offer/index'

export function findOffer(id, offers) {
    return offers.items.reduce((prev, curr) => { return curr.id == id ? curr : prev }, false)
}

class Offers extends React.Component {
    static propTypes = {

    }
 
    
    render() {
        const { offers } = this.props

        return (
            <div>
                {offers.map((offer) => <Offer offer={offer} key={offer.id} />)}
            </div>
        )   
    }
}

export default Offers