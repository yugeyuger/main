import React, { Component } from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import { Grid, Image, Menu } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";

import "../../assets/myOwnProfilePage.css";

class IndividualPost extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    author: "",
    authorImageURL: "",
    genre: "",
    postTitle: "",
    postBody: "",
    permLink: ""
  };

  componentDidMount() {
    var pathArray = window.location.pathname.split("/");
    pathArray[1] = pathArray[1].substr(1);
    const username = pathArray[1];
    const permLink = pathArray[2];
    //console.log(pathArray);
    /*const str1 = "/@";
    const newPath = str1
      .concat(username)
      .concat("/")
      .concat(permLink);*/
    //console.log("NEW PATH RIGHT HERE: " + newPath);

    axios
      .get(`/@${username}/${permLink}`)
      .then(res => {
        console.log(res);
        this.setState({
          author: res.data.postInfo.userAccountInfo.username,
          authorImageURL: res.data.postInfo.userAccountInfo.imageUrl,
          genre: res.data.postInfo.genre,
          postTitle: res.data.postInfo.title,
          postBody: res.data.postInfo.content,
          permLink: res.data.postInfo.permLink
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="postPage">
        <Grid>
          <Grid.Row className="title">
            <Grid.Column width={4} className="postPageSide" />
            <Grid.Column width={8} className="postMain">
              <h1>{ReactHtmlParser(this.state.postTitle)}</h1>
            </Grid.Column>
            <Grid.Column width={4} className="postPageSide" />
          </Grid.Row>
          <Grid.Row className="body">
            <Grid.Column width={2} className="postPageSide" />
            <Grid.Column width={10} className="postMain">
              <p>{ReactHtmlParser(this.state.postBody)}</p>
            </Grid.Column>
            <Grid.Column width={2} className="postPageSide" />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default IndividualPost;
