import React from 'react'
import { Route, Switch } from 'react-router-dom';
import UserEdit from './containers/UserEdit'
import OfferEdit from './containers/OfferEdit'
import OfferView from './containers/OfferView'
import Index from './containers/Index'
import Authorize from './Authorize'

function Login() {
    return (
        <div>
            login
            </div>
    )
}

export function Routes() {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/user/:userid" component={UserEdit} />
            <Route exact path="/offer/view/:offerid" component={OfferView} />
            <Authorize path="/offer/edit/:offerid" component={OfferEdit} />
            <Authorize path="/offer/new" component={OfferEdit} />
            <Route component={Index} />
        </Switch>
    )
}

export default Routes