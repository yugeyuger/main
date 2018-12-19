import React, { Component } from 'react'
import { Navbar, NavItem, MenuItem, Nav, NavDropdown} from 'react-bootstrap'

import NotLoggedInNavigationBar from './NotLoggedInNavigationBar'
import LoggedInNavigationBar from './LoggedInNavigationBar'

class Header extends Component {
	render() {
		if(!localStorage.getItem('userInfo')) {
			return (
				<div>
					<NotLoggedInNavigationBar />
					{this.props.children}
				</div>
			)
		} else { 
			return (
				<div>
					<LoggedInNavigationBar/>
					{this.props.children}
				</div>
			)
		}
	}
}

export default Header