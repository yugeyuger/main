import React, { Component } from "react";
import { Navbar, NavItem, MenuItem, Nav, NavDropdown } from "react-bootstrap";

import NotLoggedInNavigationBar from "./NotLoggedInNavigationBar";
import LoggedInNavigationBar from "./LoggedInNavigationBar";

import "../../../assets/main.css";

class Header extends Component {
	render() {
		console.log(window.location.pathname)
		if(!localStorage.getItem('loginStatus')) {
			return (
				<div>
					<NotLoggedInNavigationBar />
					{this.props.children}
				</div>
			)
		} else { 
			return (
				<div>
					<LoggedInNavigationBar />
					{this.props.children}
				</div>
			)
		}
	}
}

export default Header;
