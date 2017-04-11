import React, { Props, PropTypes } from 'react'

class EditableField extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        validator: PropTypes.func,
        onChange: PropTypes.func,
        editable: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    state = {
        value: this.props.value
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }

    handleChange (event) {
        let change = {
            value: event.target.value.trim()
        }

        this.setState(change)        
        this.props.onChange(change.value)
    }

    render() {
        const { title, validator, editable } = this.props
        const { value } = this.state
        
        if (!editable) {
            return (
                <p><b>{title}: </b>{value}</p>
            )
        }
    
        return (
            <label>
                {title}:
                <input type="text" value={value} onChange={this.handleChange} />
            </label>
        )
    }
}

export default EditableField