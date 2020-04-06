
import React, { Component } from "react";
import Nav from "component/nav";
import Footer from "component/footer"
import {HashRouter, Route, Switch} from 'react-router-dom';

import Case from "./case"
import Schedule from "./schedule"

export default class App extends Component {
	render() {
		return (
			<div>
				<Nav />
				<HashRouter>
					<Switch>
						<Route exact path="/" component={Schedule} />
						<Route exact path="/case" component={Case} />
					</Switch>
				</HashRouter>
				<Footer />
			</div>

		);
	}
}
