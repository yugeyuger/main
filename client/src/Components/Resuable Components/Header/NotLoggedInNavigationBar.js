import React, { Component } from 'react'
import { Menu, Input, Button, Modal, Dropdown, Header, Icon, Form } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

import './NavigationBar.css'

class NotLoggedInNavigationBar extends Component {

	state = {
		activeItem: window.location.pathname,
		login: false,
		username: '',
		password: '',
		error: '',
	} 

	handleItemClick = (e, { name }) =>  {
		var newUrl;
		if(name == 'Write About a Book') {
			newUrl = '/writeAboutABook'
		} else if(name == 'In A Nutshell') {
			newUrl = '/'
		} else if(name == 'Login') {
			newUrl = 'login'
		}

		this.setState({ activeItem: newUrl })
	}

	handleLogin = () => {
		this.setState({ login: true })
	}

	handleUsername = (e) => {
		this.setState({ username: e.target.value });
	}

	handlePassword = (e) => {
  		this.setState({ password: e.target.value });
  	}

  	logUserIn = () => {
  		if(this.state.username.length == 0) {
  			this.setState({ error: 'Please enter a username.'})
  		} else if(this.state.password.length == 0) {
  			this.setState({ error: 'Please enter a password.'})
  		} else {
  			axios.post('/login', {username: this.state.username, password: this.state.password})
 		 	.then(response => {
	 		 	if(!response.data.error) {
					localStorage.setItem('userInfo', JSON.stringify(response.data))
					this.setState({ loginSuccessful: true })
	 		 	} else {
	 		 		this.setState({error: response.data.error})
	 		 	}
     		})
  		}
  	}

  	closeLoginModal = () => {
  		this.setState({ open: false, error: ''})
  	}

  	handleLogin = () => {
  		this.setState({ open: true})
  	}

	render() {
		console.log(this.state.activeItem)
		if(this.state.loginSuccessful) {
			return <Redirect to={{ pathname: window.location.pathname, state: { nav: this.state.activeItem }}}/>
		}

		if(this.state.open) {
			return (
	  			<Modal open={this.state.open} onClose={this.closeLoginModal}>
				    <Header content='Returning Users: Login' />
				    <Modal.Content>
 						<Form>
				    		<Form.Field>
				    			<p className="error">{this.state.error}</p>
				      			<input type="text" onChange={this.handleUsername} value={this.state.username} placeholder='Username' className="inputArea"/>
				    		</Form.Field>
				    		<Form.Field>
				      			<input  onChange={this.handlePassword} value={this.state.password} placeholder='Password' className="inputArea"/>
				    		</Form.Field>
				 		</Form>
				    </Modal.Content>
				    <Modal.Actions>
				     	<Button color='green' onClick={this.logUserIn}>
				     		Login
				     	</Button>

				    </Modal.Actions>
				</Modal>
			)
		}
		if(this.state.activeItem.length > 0 && (this.state.activeItem != window.location.pathname)) {
			return <Redirect to={{ pathname: this.state.activeItem }}/>
		}
		return (
			<div>
		        <Menu stackable>
		          <Menu.Item name='In A Nutshell' active={this.state.activeItem === '/'} onClick={this.handleItemClick} />
		          <Menu.Item
		            name='Write About a Book'
		            active={this.state.activeItem === '/writeAboutABook'}
		            onClick={this.handleItemClick}
		          />
		            <Menu.Item>
		              <Input icon='search' placeholder='Search...' />
		            </Menu.Item>
		        	<Menu.Menu position='right'>
						<Menu.Item
			            name=' Log in'
			            onClick={this.handleLogin}
			          />
			          <Menu.Item
			            name='Sign Up'
			            onClick={this.handleItemClick}
			            a href='https://signup.steemit.com/'
			          />		        				        		
		        	</Menu.Menu>
		        </Menu>
		  	</div>
		)
	}
}

export default NotLoggedInNavigationBar;