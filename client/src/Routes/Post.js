import React, { Component } from "react";
import Header from "../Components/Resuable Components/Header/Header";
import IndividualPost from "../Components/Post/IndividualPost";

class Post extends Component {
  render() {
    console.log("AAAaaaaaaaaaaaaaaaaa");
    return (
      <div>
        <Header />
        <IndividualPost />
      </div>
    );
  }
}

export default Post;
