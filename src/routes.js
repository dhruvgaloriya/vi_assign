import React from 'react'
import {Route,Switch} from 'react-router-dom'
import MFList from './News/MfList'
import PageNotFound from './News/PageNotFound'
import DetailsPage from './News/DetailsPage'

const routes = (
	<Switch>
		<Route exact path="/" component={MFList}/>
		<Route path="/navi/:id" component={DetailsPage}/>
		<Route path="*" component={PageNotFound} />
	</Switch>
)

export default routes;

