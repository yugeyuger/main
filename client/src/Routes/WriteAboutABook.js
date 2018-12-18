import React, { Component } from 'react'

import Header from '../Components/Resuable Components/Header/Header'

class WriteAboutABook extends Component {
	render() {
			console.log(this.props)
		return (
			<div>
				<Header userInfo={ this.props.location.userInfo }/>
					Write A Book
			</div>
 		)
	}
}

export default WriteAboutABook