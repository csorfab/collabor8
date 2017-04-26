import React, { PropTypes } from 'react';
import './Offer.css';
import User from '../User/index'
import { Link } from 'react-router-dom'
import Organization from '../Organization/index'
import Field from '../Field'

class Offer extends React.Component {
  static propTypes = {
    offer: PropTypes.object.isRequired,
    editing: PropTypes.bool,
    view: PropTypes.string,
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    onSave: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      offer: props.offer
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({offer: nextProps.offer})
  }

  handleChange(event) {
    this.props.onChange(event)
    // const { name, value } = event

    // this.setState({
    //   offer: {
    //     ...this.state.offer,
    //     [name]: value
    //   }
    // });
  }

  render() {
    const editing = typeof this.props.editing === 'undefined' ? false : this.props.editing
    const { onCancel } = this.props
    const { offer } = this.state
    const onChange = this.handleChange

    const onSave = () => this.props.onSave(this.state.offer)

    const {
      id,
      numberOfParticipants,
      description,
      availabilityFrom,
      availabilityTill,
      locationString,
      languages,
      online,
      lab,
      field,
      type,
      user
    } = offer

    // let org = user.organization
    let org = {}

    let radioYesNo = [{ label: 'Yes', value: 1}, { label: 'No', value: 0 }]

    return (
      <div className="row">
        <div className="col-md-8">
          <span>
            <button className="btn btn-default" onClick={onCancel}>Cancel</button>
            <button className="btn btn-default" onClick={onSave}>Save</button>
            <Link className="btn btn-default" to={"/offer/edit/" + id}>Edit</Link>
          </span>
          <div className="form-horizontal">
            <Field name="numberOfParticipants" title="Size of subject pool" type="number" value={numberOfParticipants} placeholder="Enter number of subjects you can offer for testing" onChange={onChange} editable={editing} />
            <Field name="description" title="Description of subject population" type="textarea" value={description} onChange={onChange} placeholder="Give a description of the subject population (age, gender distribution, background etc." editable={editing} />
            <Field name="locationString" title="Location of subjects" type="text" value={locationString} onChange={onChange} editable={editing} />
            <Field name="online" title="Are subjects available for online (remote) testing?" type="radio" values={radioYesNo} value={online} onChange={onChange} editable={editing} />
            <Field name="lab" title="Are subjects available for lab testing?" type="radio" values={radioYesNo} value={lab} onChange={onChange} editable={editing} />
            <Field name="field" title="Are subjects available for field testing?" type="radio" values={radioYesNo} value={field} onChange={onChange} editable={editing} />
            
            <Field name="availabilityFrom" type="date" title="Subjects are available from" value={availabilityFrom} onChange={onChange} editable={editing} />
            <Field name="availabilityTill" type="date" title="Subjects are available until" value={availabilityTill} onChange={onChange} editable={editing} />
          </div>
          </div>
        <div className="col-md-4">
          <p>Offered by:</p>
          <User user={user} view="small" />
          <Organization name={org.name} uniname={org.uniname} location={org.location} image={org.image} />
          <p>Collaboration type: {type}</p>
        </div>
      </div>
    )    
    
    /*return (
      <div className="row">
        <div className="col-md-8">
          <h2>
            {numberOfParticipants} participants available for experiments
          </h2>
          <p>{description}</p>
          <div><EditableField type="number" title="Number of participants" value={numberOfParticipants} editable={editing} onChange={this.getChangeCallback('numberOfParticipants')} /></div>
          <div>
            <EditableField type="date" title="Availability" value={availabilityFrom} editable={editing} onChange={this.getChangeCallback('availabilityFrom')} />
             <EditableField type="date" title=" - " value={availabilityTill} editable={editing} onChange={this.getChangeCallback('availabilityTill')} />
          </div>
            <p>Languages: {languages}</p>
        </div>
        <div className="col-md-4">
          <p>Offered by:</p>
          <User user={user} view="small" />
          <Organization name={org.name} uniname={org.uniname} location={org.location} image={org.image} />
          <p>Collaboration type: {type}</p>
        </div>
      </div>
    )    */
  }
}


export default Offer
