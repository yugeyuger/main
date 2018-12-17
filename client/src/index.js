import React from 'react';
import ReactDOM from 'react-dom';
import{ BrowserRouter, Route } from 'react-router-dom'

import Login from './Routes/Login' 

 const App = () => {
		return (
			<BrowserRouter>
				<div>
 					<Route path="/login" component = {Login}/>
				</div>
			</BrowserRouter>
			)
}
ReactDOM.render(<App />, document.getElementById('root'));

