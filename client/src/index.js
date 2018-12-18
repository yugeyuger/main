import React from 'react';
import ReactDOM from 'react-dom';
import{ BrowserRouter, Route } from 'react-router-dom'

import Home from './Routes/Home' 
import WriteAboutABook from './Routes/WriteAboutABook' 

 const App = () => {
		return (
			<BrowserRouter>
				<div>
				 	<Route path="/" component = {Home} exact/>
 					<Route path="/writeAboutABook" component = {WriteAboutABook} exact/>
				</div>
			</BrowserRouter>
			)
}
ReactDOM.render(<App />, document.getElementById('root'));

