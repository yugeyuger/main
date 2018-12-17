import React, { Component } from 'react'
import { Navbar, NavItem, MenuItem, Nav, NavDropdown} from 'react-bootstrap'

import NotLoggedInNavigationBar from './NotLoggedInNavigationBar'

class Header extends Component {

	render() {
		if(!this.props.userInfo) {
			return (
				<div>
					<NotLoggedInNavigationBar/>
					{this.props.children}
				</div>
			)
		} else { 
			return (
				<div>
					Logged In
				</div>
			)
		}
	}
}

export default Header