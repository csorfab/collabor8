import React, { Props, PropTypes } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Geosuggest from 'react-geosuggest';


import 'react-datepicker/dist/react-datepicker.css'
import 'react-geosuggest/module/geosuggest.css'


/*



*/


class Field extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.any.isRequired,
        choices: PropTypes.array,
        name: PropTypes.string,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        validator: PropTypes.func,
        onChange: PropTypes.func,
        editable: PropTypes.bool
    }

    defaultProps = {
        editable: true
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            id: 'Field_' + Math.floor(Math.random() * 100000000)
        }
    }

    validators = {
        number: function (number) {
            if (isNaN(number)) throw 'Invalid number'
            return true
        },
        date: function (date) {
            return true
        },
        default: () => true
    }

    eventFormatters = {
        date: (moment) => moment.format('YYYY-MM-DD'),
        textarea: (event) => event.target.value,
        number: (event) => Number(event.target.value),
        geosuggest: (value) => {
            const { label, placeId, location } = value
            return { label, placeId, location }
        },
        checkboxes: (event, current) => (
            {
                ...current,
                [event.target.value]: String(event.target.checked)
            }
        ),
        default: (event) => event.target.value
    }

    editorViews = [
        {
            matches: ['text', 'number'],
            view: (p) => (
                <input type="text" id={p.id}
                    value={p.value}
                    placeholder={p.placeholder}
                    onChange={this.handleChange}
                    className={p.inputClass}
                />
            )
        },
        {
            matches: ['textarea'],
            view: (p) => (
                <textarea id={p.id}
                    placeholder={p.placeholder}
                    onChange={this.handleChange}
                    className={p.inputClass}
                    value={p.value}
                />
            )
        },
        {
            matches: ['date'],
            view: (p) => (
                <DatePicker id={p.id}
                    selected={moment(p.value)}
                    onChange={this.handleChange}
                    className={p.inputClass}
                />)
        },
        {
            matches: ['radio'],
            view: (p) => p.choices.map((choice) => (
                <label className="checkbox-inline" key={p.id + choice.value}>
                    <input type="radio"
                        name={p.id}
                        value={choice.value}
                        onChange={this.handleChange}
                        checked={choice.value == p.value}
                    />
                    {choice.label}
                </label>
            ))
        },
        {
            matches: ['geosuggest'],
            view: (p) => (
                <Geosuggest id={p.id}
                    initialValue={p.value ? p.value.label : ''}
                    inputClassName={p.inputClass}
                    onSuggestSelect={this.handleChange}
                    queryDelay={500}
                />)
        },
        {
            matches: ['checkboxes'],
            view: (p) => p.choices.map((choice) => (
                <label className="checkbox-inline">
                    <input type="checkbox"
                        value={choice.value}
                        onChange={this.handleChange}
                        checked={p.value[choice.value] == 'true'}
                    />
                    {choice.label}
                </label>
            ))
        }
    ]

    views = [
        {
            matches: ['text', 'number', 'date'],
            // view: (p) => <input id={p.id} type="text" style={{ ...p.style, border: '0' }} readOnly={true} value={p.value} />
            view: (p) => p.value
        },
        {
            matches: ['geosuggest'],
            view: (p) => <input id={p.id} type="text" style={{ ...p.style, border: '0' }} readOnly={true} value={(p.value) ? p.value.location.lat : ''} />
        },
        {
            matches: ['textarea'],
            //view: (p) => <textarea id={p.id} style={{border: '0', resize: 'none'}} readOnly={true} value={p.value} res/>
            view: (p) => <pre id={p.id}>{p.value}</pre>
        },
        {
            matches: ['radio'],
            view: (p) => <input id={p.id} type="text" style={{ border: '0' }} readOnly={true} value={
                p.choices.reduce((prev, curr) => curr.value == p.value ? curr.label : prev, 'N/A')
            } />
        },
        {
            matches: ['checkboxes'],
            view: (p) => p.value ? p.choices.filter((choice) => p.value[choice.value] == 'true').map((choice) => choice.label).join(', ') : ' '
        }
    ]

    getView(views, props) {
        return views.reduce(
            (p, c) => c.matches.reduce(
                (p, c) => c === props.type ? true : p,
                false
            ) ? c.view : p,
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

        let value = eventFormatter(event, this.props.value)

        try {
            validate(value)
        } catch (e) {
            return false
        }

        onChange({ name, value })
    }

    render() {
        const props = { ...this.props, id: this.state.id }
        const { id, type, labelClass, title, controlClass, blockClass, viewOnly } = props

        const editable = typeof props.editable === 'undefined' ? true : props.editable
        const views = editable ? this.editorViews : this.views

        const view = this.getView(views, props)
        if (view === false)
            throw '[Field] Invalid type \''+ type +'\'.'

        if (viewOnly)
            return view    
        
        return (
            <div className={blockClass}>
                <label htmlFor={id} className={labelClass}>
                    {title}
                </label>
                <div className={controlClass}>
                    {view}
                </div>
            </div>
        )
    }
}

export default Field