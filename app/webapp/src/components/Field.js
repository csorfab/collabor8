import React, { Props, PropTypes } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
require('react-datepicker/dist/react-datepicker.css')

/*



*/


class Field extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        validator: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        editable: PropTypes.bool
    }

    defaultProps = {
        editable: true
    }
    
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            // value: props.value,
            id: 'Field_' + Math.floor(Math.random()*100000000)
        }
    }
    
    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     value: nextProps.value
        // })
    }

    validators = {
        number: function (number) {
            if (isNaN(number)) throw 'Invalid number'
            return number
        },
        date: function (date) {
            return date
        },
        default: () => true
    }

    eventFormatters = {
        date: (moment) => moment.format('YYYY-MM-DD'),
        textarea: (event) => event.target.value,
        number: (event) => Number(event.target.value),
        default: (event) => event.target.value
    }

    editors = [
        {
            matches: ['text', 'number'],
            editor: (p) => <input type="text" id={p.id} value={p.value} placeholder={p.placeholder} onChange={this.handleChange} className="form-control" />
        },
        {
            matches: ['textarea'],
            editor: (p) => <textarea id={p.id} placeholder={p.placeholder} onChange={this.handleChange} className="form-control" value={p.value} />
        },
        {
            matches: ['date'],
            editor: (p) => <DatePicker id={p.id} selected={moment(p.value)} onChange={this.handleChange} />
        },
        {
            matches: ['radio'],
            editor: (p) => p.values.map((radio) => (
                        <label className="checkbox-inline" key={p.id + radio.value}>
                            <input type="radio" name={p.id} value={radio.value} onChange={this.handleChange} checked={radio.value == p.value}/> {radio.label}
                        </label>
                    ))
        }
    ]

    getEditor(editors, props) {
        return editors.reduce(
            (p, c) => c.matches.reduce(
                (p, c) => c === props.type ? true : p,
                false
            ) ? c.editor : p,
            false
        )(props)
    }
    
    handleChange(event) {
        const { type, name, onChange } = this.props
        const eventFormatter = typeof this.eventFormatters[type] === 'function'
            ? this.eventFormatters[type]
            : this.eventFormatters.default   
        
        const validate = typeof this.props.validator === 'function'
            ? this.props.validator
            : typeof this.validators[type] === 'function'
                ? this.validators[type]
                : this.validators.default
        
        let value = eventFormatter(event)
        
        try {
            validate(value)
        } catch (e) {
            value = this.props.value || ''
        }

        onChange({ name, value })
    }

    renderEditor() {
        const { title, type, placeholder, values, value } = this.props
        const { id } = this.state

        const editor = this.getEditor(this.editors, { title, type, placeholder, values, value, id })
        if (!editor)
            throw '[Field] Invalid type. Check props.'
        
        return (
            <div className="form-group">
                <label htmlFor={id} className="col-sm-4 control-label">
                    {title}
                </label>
                <div className="col-sm-8">
                    {editor}
                </div>   
            </div>
        )
    }

    renderView() {
        const { title, value } = this.props

        return (
            <div className="form-group">
                <div className="col-md-2">{title}:</div>
                <div className="col-md-6">
                    {value}
                </div>
            </div>
        )
    }
    
    render() {
        const editable = typeof this.props.editable === 'undefined' ? true : this.props.editable

        if (editable)
            return this.renderEditor()
        else
            return this.renderView()
    }
}

export default Field