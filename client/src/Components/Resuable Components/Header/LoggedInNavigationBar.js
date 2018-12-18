import React, { Component } from 'react'
import { Menu, Input, Button, Modal, Dropdown, Header, Icon, Form } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

import './NavigationBar.css'

class LoggedInNavigationBar extends Component {

	state = {
		activeItem: '',
		userInfo: this.props.userInfo
	} 

	handleItemClick = (e, { name }) =>  {
		var newUrl;
		if(name == 'Write About a Book') {
			newUrl = 'writeAboutABook'
		} else if(name == 'In A Nutshell') {
			newUrl = '/'
		} else if(name == 'Log Out') {
			newUrl = 'logout'
		}
		this.setState({ activeItem: newUrl })
	}

	render() {
		if(this.state.activeItem == 'logout') {
			console.log('logout')
		}
		if(this.state.activeItem.length > 0) {
			return <Redirect to={{ pathname: this.state.activeItem, userInfo: this.state.userInfo }}/>
		}
		return (
			<div>
		        <Menu stackable>
		          <Menu.Item name='In A Nutshell' active={this.state.activeItem === '/'} onClick={this.handleItemClick} />
		          <Menu.Item
		            name='Write About a Book'
		            active={this.state.activeItem === 'writeAboutABook'}
		            onClick={this.handleItemClick}
		          />
		            <Menu.Item>
		              <Input icon='search' placeholder='Search...' />
		            </Menu.Item>
		        	<Menu.Menu position='right'>
						<Menu.Item
			            name={this.state.userInfo.username}
			            onClick={this.handleLogin}
			        >
			        	<img className="profileImage" src={this.state.userInfo.imageUrl} />
			        	<p>{this.state.userInfo.username}</p>
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