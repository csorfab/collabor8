import React, { PropTypes } from 'react';
import InlineEdit from 'react-edit-inline'
import black from '../images/ajax-loader.gif'
import white from '../images/ajax-loader-white.gif'

export const wordCount = (string) => string.split(' ').length
export const truncateString = (string, maxWords) => string.split(' ').filter((x, i) => i < maxWords).join(' ')

export const If = (props) => props.condition ? props.children : null

export class Truncate extends React.Component {
  static propTypes = {
    maxWords: PropTypes.number
  }

  state = { truncate: true }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ truncate: !this.state.truncate })
  }

  render() {
    const { children, maxWords } = this.props
    const { truncate } = this.state
    
    if (typeof children !== 'string')
      return (<div>{children}</div>)
    
    const needTruncating = (wordCount(children) > maxWords)    
    const linkText = truncate ? 'Read more' : 'Show less'
    
    const text = needTruncating && truncate
      ? truncateString(children, maxWords) + '...'
      : children

    return (
    <span>
        {text + ' '}
      <If condition={needTruncating}>  
        <a href="#" onClick={this.handleClick}>{linkText}</a>
      </If>
    </span>
    )    
  }
}

export function objFilter(obj, predicate) {
  return Object.keys(obj)
    .filter((objKey) => predicate(obj[objKey], objKey))
    .reduce((res, key) => ({ ...res, [key]: obj[key] }), {})
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

    if (!color) color = 'black'

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
      <li className="dropdown" style={{minWidth: '180px', textAlign: 'right'}}>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{title} <span className="caret"></span></a>
        <ul className="dropdown-menu">
          {children}
        </ul>
      </li>
    )
  }
}