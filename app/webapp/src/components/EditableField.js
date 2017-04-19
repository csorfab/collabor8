import React, { Props, PropTypes } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
require('react-datepicker/dist/react-datepicker.css')


class EditableField extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        type: PropTypes.string,
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

    handleChange(event) {
        const { type } = this.props

        let change = {}

        if (type === 'date') {
            change.value = event.format('YYYY-MM-DD')
        } else {
            change.value = event.target.value
        }
        
        // let change = {
        //     value: event.target.value
        // }

        if (type === 'number') {
            if (isNaN(Number(change.value))) return;
        }

        this.setState(change)        
        this.props.onChange(change.value)
    }

    render() {
        const { title, validator, editable, type } = this.props
        const { value } = this.state
        
        if (editable) {
            var editor

            switch(type) {
                case 'text':
                case 'number':
                    editor = (
                        <input type="text" value={value} onChange={this.handleChange} />
                    )
                    break;
                case 'date':
                    editor = (
                        <DatePicker selected={moment(value)} onChange={this.handleChange} />
                    )    
            }

            return (
                <label>
                    <b>{title}</b> {editor}
                </label>
            )
        }    

        if (!editable) {
            return (
                <div className=""><b>{title}: </b>{value}</div>
            )
        }
    }
}

export default EditableField