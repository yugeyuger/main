import React, { Component } from "react";

import Header from "../Components/Resuable Components/Header/Header";

import "../assets/main.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Header nav={this.props} />
      </div>
    );
  }
}

export default Home;
