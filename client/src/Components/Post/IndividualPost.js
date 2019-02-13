import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { Grid, Image } from "semantic-ui-react";
import axios from "axios";
import showdown from "showdown";
import "../../assets/individualPostPage.css";

var converter = new showdown.Converter();

class IndividualPost extends Component {
  state = {
    author: "",
    authorImageURL: "",
    genre: "",
    postTitle: "",
    postBody: "",
    permLink: "",
    processedPostBody: ""
  };

  componentDidMount() {
    var pathArray = window.location.pathname.split("/");
    pathArray[1] = pathArray[1].substr(1);
    const username = pathArray[1];
    const permLink = pathArray[2];

    axios
      .get(`/@${username}/${permLink}`)
      .then(res => {
        // Line-break to <BR/> tag
        function changeBrTag(html) {
          return html.replace(/(\r\n\|\r|\n)/gi, "<br/>");
        }
        //Embed YouTube Video
        function changeYouTubeTag(html) {
          return html.replace(
            /https:\/\/youtu.be\/([\w]*)/gi,
            '<p><iframe width="420" height="315" src="https://www.youtube.com/embed/$1"></iframe></p>'
          );
        }

        this.setState({
          author: res.data.postInfo.userAccountInfo.username,
          authorImageURL: res.data.postInfo.userAccountInfo.imageUrl,
          genre: res.data.postInfo.genre,
          postTitle: res.data.postInfo.title,
          postBody: res.data.postInfo.content,
          permLink: res.data.postInfo.permLink,
          processedPostBody: changeBrTag(
            converter.makeHtml(res.data.postInfo.content)
          )
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
          <Grid.Row className="individualPostTitle">
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <h1>{ReactHtmlParser(this.state.postTitle)}</h1>
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
          <Grid.Row className="individualPostTitle">
            <Grid.Column width={5} />
            <Grid.Column width={6}>
              <div>
                <p>
                  <Image
                    avatar
                    className="profileImage"
                    src={this.state.authorImageURL}
                  />
                  {ReactHtmlParser(this.state.author)}
                </p>
              </div>
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <p>{/*ReactHtmlParser(this.state.postBody)*/}</p>
              {ReactHtmlParser(this.state.processedPostBody)}
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default IndividualPost;
