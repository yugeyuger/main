import React, { Component } from "react";
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
import axios from "axios";

import "../../../assets/main.css";
import "./NavigationBar.css";

class NotLoggedInNavigationBar extends Component {
  state = {
    activeItem: window.location.pathname,
    login: false,
    username: "",
    password: "",
    error: ""
  };

  handleItemClick = (e, { name }) => {
  	console.log(name)
  	console.log(name =="Log in")
    var newUrl;
    if (name == "Write About a Book") {
      	newUrl = "/writeAboutABook";
      this.setState({ open: true });
    } else if (name == "In A Nutshell" || name == "IAN") {
      	newUrl = "/";
	} else if (name == "Log in") {
      	this.setState({ open: true });
      return;
    }
    console.log(newUrl)
    this.setState({ activeItem: newUrl });
  };

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  logUserIn = () => {
    if (this.state.username.length == 0) {
      this.setState({ error: "Please enter a username." });
    } else if (this.state.password.length == 0) {
      this.setState({ error: "Please enter a password." });
    } else {
      axios
        .post("/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          if (!response.data.error) {
            localStorage.setItem("loginStatus", JSON.stringify(response.data));
            this.setState({ loginSuccessful: true });
          } else {
            this.setState({ error: response.data.error });
          }
        })
    }
  };

  closeLoginModal = () => {
    this.setState({ open: false, error: "", activeItem: window.location.pathname, username: '', password: ''});
  };

  render() {
    if (this.state.loginSuccessful) {
      return <Redirect to={{ pathname: this.state.activeItem}} />;
    }

    if (this.state.open) {
      return (
        <Modal className="loginModal" open={this.state.open} onClose={this.closeLoginModal}>
          <Modal.Content>
            <Form>
              <Form.Field>
                <p className="error">{this.state.error}</p>
                <input
                  type="text"
                  onChange={this.handleUsername}
                  value={this.state.username}
                  placeholder="Username"
                  className="loginInputArea"
                />
              </Form.Field>
              <Form.Field>
                <input
                  onChange={this.handlePassword}
                  value={this.state.password}
                  placeholder="Password"
                  className="loginInputArea"
                  type="password"
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.logUserIn} fluid>
              Login
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    if (
      this.state.activeItem.length > 0 &&
      this.state.activeItem != window.location.pathname
    ) {
      return <Redirect to={{ pathname: this.state.activeItem }} />;
    }
    return (
      <div class="navBackground">
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
              name="IAN"
              active={this.state.activeItem === "/"}
              onClick={this.handleItemClick}
            >
                <Image size='mini' 
                  className="profileImage"
                  src={require("../../../assets/images/logo1.png")}
                />
            </Menu.Item>
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
              	className="writeNavBar"
                name="Write About a Book"
                onClick={this.handleItemClick}
              >
              </Menu.Item>
              <Menu.Item className="logInOnNavBar" name="Log in" onClick={this.handleItemClick} />
              <Menu.Item className="signUpOnNavBar"
                name="Sign Up"
                onClick={this.handleItemClick}
                a
                href="https://signup.steemit.com/"
              />
            </Responsive>
            <Responsive as={MenuItem} maxWidth={767}>
              <Dropdown icon="bars">
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="Write About a Book"
                    name="Write About a Book"
                    onClick={this.handleItemClick}
                    icon="write"
                  />
                  <Dropdown.Item
                    text="Log in"
                    name="Log in"
                    onClick={this.handleItemClick}
                    icon="sign in"
                  />
                  <Dropdown.Item
                    text="Sign Up"
                    name="Sign Up"
                    onClick={this.handleItemClick}
                    a
                    href="https://signup.steemit.com/"
                    icon="user plus"
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

export default NotLoggedInNavigationBar;
