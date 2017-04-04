import React, { Props } from 'react'
import Offer from './Offer/index'

class Offers extends React.Component {
    static propTypes = {

    }

    render() {
        const { offers } = this.props

        return (
            <div>
                {offers.map((offer) => <Offer offer={offer} />)}
            </div>
        )
    }
}

export default Offers