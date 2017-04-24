import React, { PropTypes } from 'react';
import './Offer.css';
import User from '../User/index'
import Organization from '../Organization/index'
import EditableField from '../EditableField'

class Offer extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    onChange: PropTypes.func,
    onCancel: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.onCancelClicked = this.onCancelClicked.bind(this)
    this.onSaveClicked = this.onSaveClicked.bind(this)
  }

  state = {}  
  
  componentWillReceiveProps(newProps) {
    this.setState({offer: newProps.offer})
  }  
  
  componentWillMount() {
    this.setState({offer: this.props.offer})
  }

  getChangeCallback(field) {
    var that = this;

    return (newValue) => {
      that.setState({ offer: { ...that.state.offer, [field]: newValue } })
    }
  }  
  
  onSaveClicked() {
    const { onChange } = this.props

    onChange(this.state.offer)
  }  

  onCancelClicked() {
    this.setState({ offer: this.props.offer })
    this.props.onCancel && this.props.onCancel()
  }

  render() {
    const { onSaveClicked, onCancelClicked } = this
    const editing = this.props.editing || false
    const { offer, onChange } = this.state
    const {
      numberOfParticipants,
      description,
      availabilityFrom,
      availabilityTill,
      location,
      languages,
      online,
      lab,
      field,
      type,
      user
    } = offer

    // let org = user.organization
    let org = {}

    return (
      <div className="row">
        <div className="col-md-8">
          <h2>
            {numberOfParticipants} participants available for experiments
            {editing ? (
              <span>
                <button style={{ float: 'right' }} onClick={onCancelClicked}>Cancel</button>
                <button style={{ float: 'right' }} onClick={onSaveClicked}>Save</button>
               </span>)
            : (null)}
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
    )    
  }
}

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  onEdited: (id, changes) => {
    dispatch({
      type: 'EDIT_OFFER',
      id,
      changes
    })
  }
})

export default Offer
