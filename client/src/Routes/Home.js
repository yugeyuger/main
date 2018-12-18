import React, { Component } from 'react'

import Header from '../Components/Resuable Components/Header/Header'

class Home extends Component {

	render() {
		console.log(this.props.location.userInfo)
 		return (
			<div>
				<Header userInfo={ this.props.location.userInfo }/>
			</div>
 		)
	}
}

export default Home