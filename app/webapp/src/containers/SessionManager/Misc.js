import React from 'react';
import loadergif from '../../images/ajax-loader.gif'


export class FetchingIcon extends React.Component {
  render() {
    if (this.props.isFetching) {
      return (
        <span>
          <img src={loadergif} style={{ marginRight: '10px' }} />
          {this.props.children}
        </span>  
      )
    } else {
      return (
        <span>
          {this.props.children}
        </span>  
      )
    }
  }
}

export class Dropdown extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{title} <span className="caret"></span></a>
        <ul className="dropdown-menu">
          {children}
        </ul>
      </li>
    )
  }
}