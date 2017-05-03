import React, { PropTypes } from 'react';
import './Offer.css';
import User from '../User/index'
import { Link } from 'react-router-dom'
import Organization from '../Organization/index'
import Field from '../Field'
import Form from '../Form'
import { Truncate } from '../Misc'
import collabImage from '../../images/collab.png'

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

  renderItemView() {
    const { offer } = this.props

    const {
      id,
      numberOfParticipants,
      description,
      availabilityFrom,
      availabilityTill,
      location,
      languageNative,
      languageSecond,
      devices,
      testMethods,
      payment,
      additional,
      user
    } = offer

    return (
      <div className="row offerItem">
          <div className="col-sm-8">
          <h3><img src={collabImage} className="offerIcon" width={48} height={48} style={{ float: 'left' }} /><Link to={"/offer/view/" + id}>{numberOfParticipants} participants available for experiments</Link></h3>
            <p><Truncate maxWords={20}>{description}</Truncate></p>
            <Form className="form-horizontal"
              childrenProps={{
              editable: false,
              blockClass: 'form-group valign-relative',
                labelClass: 'col-sm-4 offerLabel',
                controlClass: 'col-sm-8 valign-absolute-middle'
              }}>
              <Field name="numberOfParticipants" value={numberOfParticipants}
                type="number"
                title="Number of participants"
              />
              <Field name="availability" value={availabilityFrom + ' - ' + availabilityTill}
                type="text"
                title="Availability period"
              />
              <Field name="location" value={location.label}
                type="text"
                title="Location"
              />
              <Field name="languages" value={languageNative + ' (native)' + (languageSecond ? ', ' + languageSecond : '')}
                type="text"
                title="Languages"
              /> 
            </Form>
          </div>
          <div className="col-sm-4">
            <p className="offerLabel bigger">Offered by:</p>
            <User user={user} view="small" />
            <div className="offerEditPanel">
              <Link className="btn btn-default" to={"/offer/edit/" + id}>Edit</Link>
            </div>
          </div>
      </div>

    )
  }

  renderFullView() {

  }

  render() {
    const editing = typeof this.props.editing === 'undefined' ? false : this.props.editing
    const { offer, onCancel } = this.props
    const onChange = this.handleChange

    const view = this.props.view || 'full'

    if (view === 'item')
      return this.renderItemView()

    const onSave = () => this.props.onSave()

    const {
      id,
      numberOfParticipants,
      description,
      availabilityFrom,
      availabilityTill,
      location,
      languageNative,
      languageSecond,
      devices,
      testMethods,
      payment,
      additional,
      user
    } = offer

    // let org = user.organization
    let org = {}

    let radioYesNo = [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }]

    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <Form className="form-horizontal"
              childrenProps={{
                onChange,
                editable: editing,
                labelClass: 'col-sm-offset-1 col-sm-3 offerLabel',
                blockClass: 'form-group',
                controlClass: 'col-sm-8',
                inputClass: 'form-control'
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
              <Field name="location" value={location}
                type="geosuggest"
                title="Location of subjects"
                placeholder="Start typing to search for locations"
              />
              <Field name="testMethods" value={testMethods}
                type="checkboxes"
                title="Available testing methods"
                choices={[
                  { label: 'Online (remote) testing', value: 'online' },
                  { label: 'Lab testing', value: 'lab' },
                  { label: 'Field testing', value: 'field' }
                ]}
              />
              <Field name="availabilityFrom" value={availabilityFrom}
                type="date"
                title="Subjects are available from"
              />
              <Field name="availabilityTill" value={availabilityTill}
                type="date"
                title="Subjects are available until"
              />
              <Field name="languageNative" value={languageNative}
                type="text"
                title="Native language of subjects"
              />
              <Field name="languageSecond" value={languageSecond}
                type="text"
                title="Second language subjects speak"
              />
              <Field name="payment" value={payment}
                type="textarea"
                title="Payment of subjects"
                placeholder="Describe how do you compensate subject participating in the tests (payment, course credits, etc)."
              />
              <Field name="devices" value={devices}
                type="checkboxes"
                title="Available devices"
                choices={[
                  { label: 'EEG', value: 'eeg' },
                  { label: 'fMRI', value: 'fmri' },
                  { label: 'Eyetracking', value: 'eye' }
                ]}
              />
              <Field name="additional" value={additional}
                type="textarea"
                title="Additional clarification of available experimental setting"
                placeholder="Please provide any clarification/additional description of the offered experimental setting that you find necessary for requestors to know."
              />
            </Form>
          </div>
          <div className="col-md-3">
            <p>Offered by:</p>
            <User user={user} view="small" />
            <Organization name={org.name} uniname={org.uniname} location={org.location} image={org.image} />
          </div>
        </div>
        <div className="row">
          <button className="btn btn-default" onClick={onCancel}>Cancel</button>
          <button className="btn btn-default" onClick={onSave}>Save</button>
          <Link className="btn btn-default" to={"/offer/edit/" + id}>Edit</Link>
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
