import React from 'react'
import { Route, Switch } from 'react-router-dom';
import UserEdit from './containers/UserEdit'
import OfferEdit from './containers/OfferEdit'
import OfferView from './containers/OfferView'
import Index from './containers/Index'
import Authorize from './Authorize'
import SignIn from './containers/SignIn'
import { CSSTransitionGroup } from 'react-transition-group'


export function Routes() {
    return (
        <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={1}
        >
            <Switch key={location.pathname}>
                <Route exact path="/signin" component={SignIn} key="ROUTE_1" />
                <Route exact path="/user/:userid" component={UserEdit} key="ROUTE_2" />
                <Route exact path="/offer/view/:offerid" component={OfferView} key="ROUTE_3" />
                <Authorize path="/offer/edit/:offerid" component={OfferEdit} key="ROUTE_4" />
                <Authorize path="/offer/new" component={OfferEdit} key="ROUTE_5" />
                <Route exact path="/" component={Index} key="ROUTE_6" />

            </Switch>
        </CSSTransitionGroup>

    )
}

export default Routes