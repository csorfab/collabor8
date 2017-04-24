import React from 'react';
import black from '../images/ajax-loader.gif'
import white from '../images/ajax-loader-white.gif'


export class FetchingIcon extends React.Component {
  render() {
    let { isFetching, color } = this.props
    const images = { black, white }

    if(!color) color = 'black'

      return (
        <span>
          <img src={images[color]} style={{ marginRight: '10px', visibility: isFetching ? 'visible' : 'hidden' }} />
          {this.props.children}
        </span>  
      )
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