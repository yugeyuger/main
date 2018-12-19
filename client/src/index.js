import React from 'react';
import ReactDOM from 'react-dom';
import{ BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Routes/Home' 
import WriteAboutABook from './Routes/WriteAboutABook' 

 const App = () => {
		return (
			<BrowserRouter>
				<Switch>
				 	<Route path="/" component = {Home} exact/>
 					<Route path="/writeAboutABook" component = {WriteAboutABook} exact/>
				</Switch>
			</BrowserRouter>
			)
}
ReactDOM.render(<App />, document.getElementById('root'));

