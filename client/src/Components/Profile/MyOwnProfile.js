import React, { Component } from 'react'
import axios from "axios"

class Header extends Component {
	state = {
		profileInfo: {},
		error:'',
		a: ''
	}

	constructor(props) {
    	super(props);
    	this.getProfileInfo();
    }

    getProfileInfo = () => {
    	axios.get("/@?username=" + JSON.parse(localStorage.getItem("loginStatus")).username)
	    .then(res => {
	    	console.log(res)
	    	if(res.data.message) {
	    		this.setState({ error: res.data.message})
	    	} else {
		        this.setState({a: res.data})
	    	}
	    })
  	}

	render() {
		return (
			<div>
				{this.state.a}

			</div>
		)
	}
}

export default Header