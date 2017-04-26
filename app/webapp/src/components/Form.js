import React from 'react'
import { objFilter } from './Misc'

export class Form extends React.Component {
    render() {
        const { children, childrenProps } = this.props
        
        return (
            <div className={this.props.className}>      
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child,
                        objFilter(childrenProps, (prop, propKey) => typeof child.props[propKey] === 'undefined')
                    )
                })}
            </div>
        )
    }
}

export default Form