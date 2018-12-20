import React from 'react';
import ReactDOM from 'react-dom';
import{ BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Routes/Home' 
import WriteAboutABook from './Routes/WriteAboutABook' 
import Profile from './Routes/Profile' 

 const App = () => {
		return (
			<BrowserRouter>
				<Switch>
				 	<Route path="/" component = {Home} exact/>
 					<Route path="/writeAboutABook" component = {WriteAboutABook} exact/>
 					<Route path="/@:username" component = {Profile} exact/>
				</Switch>
			</BrowserRouter>
			)
}
ReactDOM.render(<App />, document.getElementById('root'));

