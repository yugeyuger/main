import React, { Component } from 'react'

import '../../assets/errorsOnProfilePage.css'

class ErrorsOnProfilePage extends Component {

	render() {
		return (
			<div className="errorMessage"><h4>{this.props.error}</h4></div>
			)
	}
}

export default ErrorsOnProfilePage