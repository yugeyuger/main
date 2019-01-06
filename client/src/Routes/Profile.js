import React, { Component } from 'react'

import Header from '../Components/Resuable Components/Header/Header'
import MyOwnProfile from '../Components/Profile/MyOwnProfile'

class Profile extends Component {

	render() {
		console.log(JSON.parse(localStorage.getItem("loginStatus")).username)
		console.log(window.location.pathname)
		if(window.location.pathname == ("/@" + JSON.parse(localStorage.getItem("loginStatus")).username)) {
			console.log("in here yo ma jan")
		 		return (
					<div>
						<Header/>
						<MyOwnProfile/>
					</div>
		 		)		
		} else {
	 		return (
				<div>
					<Header/>
					Another Profile
				</div>
 			)
		}

	}
}

export default Profile