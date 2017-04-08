export class Link extends React.Component {
  render() {
    let { id, href, children, onClick } = this.props

    onClick = onClick || function(){ }
    href = href || '#'



    return (
      <a id={id} href={href} onClick={onClick}>{children}</a>
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