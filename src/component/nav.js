
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import "./nav.scss";
import logo from "src/pages/react-multi.png"
export default class Nav extends Component {

	render() {
		return (
			<div className="menu columns">
				<div className="column is-2 logo"><img src={logo} /></div>
				<div className="columns column nav is-8">
					<div className="nav-item"><a href="/#/">HOME</a></div>
					<div className="nav-item"><a href="/#/case">CASE</a></div>
				</div>
				<div className="column is-2"></div>
			</div>
		);
	}
}
