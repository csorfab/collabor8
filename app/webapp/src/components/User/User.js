import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import styles from './User.css';

class User extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    view: PropTypes.oneOf(['small', 'medium'])
  }
  
  render = () => {
    const { user } = this.props
    const UserLink = () => (<Link to={'/user/' + user.id}>{user.name}</Link>)

    switch (this.props.view) {
      case 'small':
        return (
          <div>
            <img width="24" height="24" src={user.image_url} style={{ float: 'left', marginRight: '6px' }} />
            <span style={{ height: '24px', verticalAlign: 'bottom', display: 'table-cell', paddingTop: '4px' }}><UserLink /></span>
          </div>
        )
      case 'medium':
        return (
          <h2>
            <img width="64" height="64" src={user.image_url} style={{ float: 'left', marginRight: '24px' }} />
            <span style={{ height: '64px', verticalAlign: 'bottom', display: 'table-cell', paddingTop: '24px' }}><UserLink /></span>
          </h2>
        )
      
    }
  }
}

export default User
