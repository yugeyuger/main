import React, { Component } from 'react'

import Header from '../Components/Resuable Components/Header/Header'
import MyOwnProfile from '../Components/Profile/MyOwnProfile'

class Profile extends Component {

	render() {
		if(this.props.location.state) {
			if(this.props.location.state.type == "viewOwnProfile") {
		 		return (
					<div>
						<Header/>
						<MyOwnProfile/>
					</div>
		 		)		
			}
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