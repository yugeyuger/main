import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../src/assets/main.css";

import Home from './Routes/Home' 
import WriteAboutABook from './Routes/WriteAboutABook' 
import Profile from './Routes/Profile' 
import PostPage from './Routes/Post' 

const App = () => {
		return (
			<BrowserRouter>
				<Switch>
				 	<Route path="/" component = {Home} exact/>
 					<Route path="/writeAboutABook" component = {WriteAboutABook} exact/>
 					<Route path="/@:username" component = {Profile} exact/>
 				 	<Route path="/@:username/:permlink" component = {PostPage} exact/>
				</Switch>
			</BrowserRouter>
			)
}
ReactDOM.render(<App />, document.getElementById('root'));
