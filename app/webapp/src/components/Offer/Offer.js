import React from 'react';
import styles from './Offer.css';
import User from '../User/index'
import Organization from '../Organization/index'

class Offer extends React.Component {
  static propTypes = {

  }
  render() {
    const { offer } = this.props
    const {
      numberOfParticipants,
      description,
      availability,
      location,
      languages,
      online,
      lab,
      field,
      type,
      user
    } = offer

    let org = user.organization    
    
    return (
      <div class="container-fluid">
        <div class="col-md-8">
          <h1>{numberOfParticipants} participants available
for experiments</h1>
          <p>{description}</p>
          <p>Number of participants: {numberOfParticipants}</p>
          <p>Availability: {availability}</p>
          <p>Languages: {languages}</p>
        </div>
        <div class="col-md-4">
          <p>Offered by:</p>
          <User name={user.name} fields={user.fields} title={user.title} />
          <Organization name={org.name} uniname={org.uniname} location={org.location} image={org.image} />
          <p>Collaboration type: {type}</p>
        </div>
      </div>
    )  
  }
}

export default Offer
