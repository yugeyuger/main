import React, { Component } from 'react'

import Header from '../Components/Resuable Components/Header/Header'
import MyOwnProfile from '../Components/Profile/MyOwnProfile'
import AnotherProfile from '../Components/Profile/AnotherProfile'

class Profile extends Component {

	render() {
		console.log(window.location.pathname)
		if(window.location.pathname == ("/@" + JSON.parse(localStorage.getItem("loginStatus")).username)) {
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
					<AnotherProfile/>
				</div>
 			)
		}

	}
}

export default Profile