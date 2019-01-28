import React, { Component } from "react";
import { browserHistory } from 'react-router';
import {
  Menu,
  Input,
  Button,
  Modal,
  Dropdown,
  Header,
  Icon,
  Form,
  Responsive,
  MenuItem,
  Image
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";

import "../../../assets/main.css";
import "./NavigationBar.css";

class LoggedInNavigationBar extends Component {
	constructor(props) {
    super(props);
	}
	
  state = {
  	a: '',
    activeItem: window.location.href,
    logout: false,
    changePage: false
  };

 	handleItemClick = (e, { name }) => {
		var newUrl;
		if (name == "Write About a Book") {
			newUrl = "/writeAboutABook";
		} else if (name == "In A Nutshell") {
			newUrl = "/";
		} else if (name == "N") {
			newUrl = "/";
		} else if (name == "Log Out") {
			localStorage.removeItem("loginStatus");
			newUrl = "logout";
		}  else if(name == "Profile") {
			newUrl = "/@" + JSON.parse(localStorage.getItem("loginStatus")).username
    }
      this.setState({ activeItem: newUrl , changePage: true});  
  };

  render() {
    if (this.state.activeItem == "logout") {
      return <Redirect to={{ pathname: "/" }} />;
    }
    if (this.state.changePage && this.state.activeItem.length > 1) {
      console.log(this.state.activeItem)
      this.setState({changePage: false})
      return <Redirect to={{ pathname: this.state.activeItem }} />;
    }
    return (
      <div className="navBackground">
        <Menu borderless secondary>
          <Responsive as={MenuItem} minWidth={767}>
            <Menu.Item
              name="In A Nutshell"
              active={this.state.activeItem === "/"}
              onClick={this.handleItemClick}
            >
              <Image size='mini' 
                  className="profileImage"
                  src={require("../../../assets/images/logo1.png")}
                />
            </Menu.Item>
          </Responsive>
          <Responsive as={MenuItem} maxWidth={767}>
            <Menu.Item
              name="N"
              active={this.state.activeItem === "/"}
              onClick={this.handleItemClick}
            />
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Responsive>
          <Menu.Menu position="left">
            <Responsive as={MenuItem} minWidth={767}>
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              <Menu.Item
                name="Write About a Book"
                active={this.state.activeItem === "/writeAboutABook"}
                onClick={this.handleItemClick}
              />
              <Menu.Item active={window.location.pathname === "/@" + JSON.parse(localStorage.getItem("loginStatus")).username} name="Profile" onClick={this.handleItemClick}>
                <Image avatar
                  className="profileImage"
                  src={JSON.parse(localStorage.getItem("loginStatus")).imageUrl}
                />
                <p>{JSON.parse(localStorage.getItem("loginStatus")).username}</p>
              </Menu.Item>
              <Menu.Item name="Log Out" onClick={this.handleItemClick} />
            </Responsive>
            <Responsive as={MenuItem} maxWidth={767}>
              <Dropdown icon="bars">
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="Write About a Book"
                    name="Write About a Book"
                    active={this.state.activeItem === "/writeAboutABook"}
                    onClick={this.handleItemClick}
                    icon="write"
                  />
                  <Dropdown.Item
                    text="Profile"
                    name="Profile"
                    onClick={this.handleItemClick}
                    icon="user"
                  />
                  <Dropdown.Item
                    text="Log Out"
                    name="Log Out"
                    onClick={this.handleItemClick}
                    icon="log out"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Responsive>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default LoggedInNavigationBar;
