import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserEdit from './containers/UserEdit'
import OfferEdit from './containers/OfferEdit'
import Index from './containers/Index'

export function Routes() {
    return (
        <Switch>
            <Route path="/user/:userid" component={UserEdit} />
            <Route path="/offer/:action/:offerid" component={OfferEdit} />
            <Route path="/offer/:action" component={OfferEdit} />
            <Route path="/" component={Index} />
        </Switch>
    )
}

export default Routes