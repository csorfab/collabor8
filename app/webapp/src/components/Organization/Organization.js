import React from 'react';
import styles from './Organization.css';

class Organization extends React.Component {
  static propTypes = {

  }
  render() {
    const { 
      name, uniname, location, image
    } = this.props
    
    return (
      <div>
        <p><b>{uniname}</b></p>
        <p><i>{name}</i></p>
        <p>{location}</p>
      </div>
    )  
  }
}

export default Organization
