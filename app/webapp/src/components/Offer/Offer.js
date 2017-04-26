import React, { PropTypes } from 'react';
import './Offer.css';
import User from '../User/index'
import { Link } from 'react-router-dom'
import Organization from '../Organization/index'
import Field from '../Field'
import Form from '../Form'

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
  }

  handleChange(event) {
    this.props.onChange(event)
  }

  renderFullView() {

  }

  render() {
    const editing = typeof this.props.editing === 'undefined' ? false : this.props.editing
    const { onCancel } = this.props
    const { offer } = this.props
    const onChange = this.handleChange

    const onSave = () => this.props.onSave()

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

    let radioYesNo = [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }]

    return (
      <div className="row">
        <div className="col-md-8">
          <span>
            <button className="btn btn-default" onClick={onCancel}>Cancel</button>
            <button className="btn btn-default" onClick={onSave}>Save</button>
            <Link className="btn btn-default" to={"/offer/edit/" + id}>Edit</Link>
          </span>
          <Form className="form-horizontal"
            childrenProps={{
              onChange,
              editable: editing
            }}>
            <Field name="numberOfParticipants" value={numberOfParticipants}
              type="number"
              title="Size of subject pool"
              placeholder="Enter number of subjects you can offer for testing"
            />
            <Field name="description" value={description}
              type="textarea" 
              title="Description of subject population"
              placeholder="Give a description of the subject population (age, gender distribution, background etc.)"
            />
            <Field name="locationString" value={locationString}
              type="text"
              title="Location of subjects"
              placeholder="Start typing to search for locations"
            />
            <Field name="online" value={online}
              type="radio"
              values={radioYesNo}
              title="Are subjects available for online (remote) testing?"
            />
            <Field name="lab" value={lab}
              type="radio"
              values={radioYesNo}
              title="Are subjects available for lab testing?"
            />
            <Field name="field" value={field}
              type="radio"
              values={radioYesNo}
              title="Are subjects available for field testing?"
            />

            <Field name="availabilityFrom" value={availabilityFrom}
              type="date"
              title="Subjects are available from"
            />
            <Field name="availabilityTill" value={availabilityTill}
              type="date"
              title="Subjects are available until"
            />
          </Form>
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
