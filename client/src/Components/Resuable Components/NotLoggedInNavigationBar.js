import React, { Component } from 'react'

import LoginModal from './LoginModal'

import { FormGroup, FormControl, Button, Navbar, NavItem, MenuItem, Nav, NavDropdown} from 'react-bootstrap';

class NavigationBar extends Component {
	state = {
		show: false
	}

	fcn = () => {
		this.setState({show: true})
 	}
	render() {
		return (
			<div>
				<LoginModal show={this.state.show}/>
				<Navbar>
				  <Navbar.Header>
				    <Navbar.Brand>
				      <a href="/">In A Nutshell</a>
				    </Navbar.Brand>
				  </Navbar.Header>
				  <Nav>
				  	<Navbar.Form>
				      <FormGroup>
				        <FormControl type="text" placeholder="Search" />
				      </FormGroup>{' '}
				    </Navbar.Form>
				  </Nav>
				  <Nav>
				    <NavItem eventKey={1} href="/writeAboutABook">
				     	Write About a Book
				    </NavItem>
				    <NavItem eventKey={2} onClick={this.fcn}>
				    	 Login 
				    </NavItem>
				    <NavItem eventKey={2} href="https://signup.steemit.com/">
				    	Sign Up 
				    </NavItem>
				  </Nav>
				</Navbar>
			</div>
 		)
	}
}

export default NavigationBar