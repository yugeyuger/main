import React, { Component } from "react";
import { Grid, Image, Menu } from "semantic-ui-react";
import axios from "axios";

import "../../assets/myOwnProfilePage.css";

import ErrorsOnProfilePage from "./ErrorsOnProfilePage";
import ProfilePageMenu from "./ProfilePageMenu";
import BookmarksOrPosts from "./BookmarksOrPosts";

class MyOwnProfilePage extends Component {
  state = {
    userProfileInfo: {},
    error: "",
    activeItem: "Posts About Books",
    dataToSee: {},
    removeLoading: false
  };

  constructor(props) {
    super(props);
    this.getProfileInfo();
  }

  getProfileInfo = () => {
    axios
      .get(
        "/@?username=" +
          JSON.parse(localStorage.getItem("loginStatus")).username
      )
      .then(res => {
        this.setState({ removeLoading: true });
        if (res.data.message) {
          this.setState({ error: res.data.message });
        } else {
          this.setState({ userProfileInfo: res.data.userProfileInfo });
          this.setState({
            dataToSee: this.state.userProfileInfo.listOfPostUsersMade
          });
        }
      });
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === "Bookmarks") {
      this.setState({
        dataToSee: this.state.userProfileInfo.listOfPostsOfBookmarks
      });
    } else {
      this.setState({
        dataToSee: this.state.userProfileInfo.listOfPostUsersMade
      });
    }
  };

  render() {
    if (this.state.error.length > 0) {
      return <ErrorsOnProfilePage error={this.state.error} />;
    }

    return (
      <div className="profilePage">
        <Grid>
          <Grid.Row>
            <Grid.Column width={6} className="profilePageSide" />
            <Grid.Column width={4} className="userInfo">
              <Image
                size="small"
                circular
                className="userProfileImage"
                src={JSON.parse(localStorage.getItem("loginStatus")).imageUrl}
              />
              <h2>
                {JSON.parse(localStorage.getItem("loginStatus")).username}
              </h2>
            </Grid.Column>
            <Grid.Column width={6} className="profilePageSide" />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={14} className="profilePageSide">
              <Menu tabular className="profileMenu">
                <Menu.Item
                  active={this.state.activeItem === "Posts About Books"}
                  name="Posts About Books"
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  active={this.state.activeItem === "Bookmarks"}
                  name="Bookmarks"
                  onClick={this.handleItemClick}
                />
              </Menu>
              <BookmarksOrPosts
                tab={this.state.activeItem}
                dataToSee={this.state.dataToSee}
                removeLoading={this.state.removeLoading}
              />
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default MyOwnProfilePage;
