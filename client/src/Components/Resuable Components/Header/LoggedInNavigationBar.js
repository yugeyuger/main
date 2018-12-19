import React, { Component } from 'react'
import { Menu, Input, Button, Modal, Dropdown, Header, Icon, Form } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

import './NavigationBar.css'

class LoggedInNavigationBar extends Component {

	state = {
		activeItem: window.location.pathname,
		logout: false
	} 

	handleItemClick = (e, { name }) =>  {
		var newUrl;
		if(name == 'Write About a Book') {
			newUrl = '/writeAboutABook'
		} else if(name == 'In A Nutshell') {
			newUrl = '/'
		} else if(name == 'Log Out') {
			localStorage.removeItem('userInfo')
			newUrl = 'logout'
		}
		this.setState({ activeItem: newUrl })
	}

	render() {
		if(this.state.activeItem == 'logout') {
			return <Redirect to={{ pathname: window.location.pathname }}/>
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
			            onClick={this.handleLogin}
			        >
			        	<img className="profileImage" src={JSON.parse(localStorage.getItem('userInfo')).imageUrl} />
			        	<p>{JSON.parse(localStorage.getItem('userInfo')).username}</p>
			        </Menu.Item>
			          <Menu.Item
			            name='Log Out'
			            onClick={this.handleItemClick}
			          />		        				        		
		        	</Menu.Menu>
		        </Menu>
		  	</div>				
		)
	}
}

export default LoggedInNavigationBar;