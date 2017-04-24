import React from 'react';
import './User.css';

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
