import React from 'react';
import styles from './User.css';

class User extends React.Component {
  static propTypes = {

  }
  render = () => (
    <div>
      {this.props.name}
    </div>
  )
}

export default User
