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
            <Route path="/login" component={Login} />
            <Route path="/user/:userid" component={UserEdit} />
            <Route path="/offer/view/:offerid" component={OfferView} />
            {/*<Route component={Authorize}>*/}
                <Route path="/offer/edit/:offerid" component={OfferEdit} />
                <Route path="/offer/new" component={OfferEdit} />
            {/*</Route>    */}
            <Route path="/" component={Index} />
        </Switch>
    )
}

export default Routes