import React from 'react'
import { connect } from 'react-redux'
import InlineEditable from '../components/Misc'
import OffersContainer from './OffersContainer'
import User from '../components/User'
import { fetchUsers } from '../actions'

class UserEdit extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        const { fetchUsers } = this.props

        fetchUsers()
    }

    render() {


        const { userid } = this.props.match.params
        const { session, users } = this.props
        const currentUser = session.user
        const user = users.items.reduce((prev, curr) => { return curr.id == userid ? curr : prev }, {})
                console.log(user)
        const canEdit = session.signedIn && user.id === currentUser.id

        return (           
            <div>
                <div className="jumbotron">
                    <div className="container">
                        
                        { !session.signedIn ?
                            'User not signed in'
                            :
                        <div className="row">
                            <div className="col-md-4">    
                                    <User user={user} view="medium" editable={canEdit} />
                                <InlineEditable text="lofasz" editable={canEdit}/>     
                            </div>
                        </div>    
                            }
                    </div>
                </div>
                { session.signedIn ? (
                    <div className="container">
                        <OffersContainer filter={(o) => o.user_id == user.id} />
                    </div>
                ) : ''}    
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { session, users } = state

    return { session, users }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers: () => {
            dispatch(fetchUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
