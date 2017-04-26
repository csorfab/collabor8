import React from 'react';
import InlineEdit from 'react-edit-inline'
import black from '../images/ajax-loader.gif'
import white from '../images/ajax-loader-white.gif'

export function objFilter(obj, predicate) {
  return Object.keys(obj)
    .filter( (objKey) => predicate(obj[objKey], objKey) )
    .reduce( (res, key) => ({ ...res, [key]: obj[key]}), {} )
}

export function InlineEditable(props) {
  const { editable } = props

  if (editable) {
      return (<InlineEdit {...props} />)
  } else {
      return (<span>{props.text}</span>)
  }                    
}

export class FetchingIcon extends React.Component {
  render() {
    let { isFetching, color } = this.props
    const images = { black, white }

    if(!color) color = 'black'

      return (
        <span>
          <img src={images[color]} style={{ marginRight: '10px', visibility: isFetching ? 'visible' : 'hidden' }} alt="Loading..." />
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