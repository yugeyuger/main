var jwt = require('jsonwebtoken')
var steem = require('steem')
var NodeRSA = require('node-rsa');
var admin = require('firebase-admin')

var Firebase = require('./firebase')
var firebase = new Firebase()

module.exports = class ServerHelpers {

	logUserIn(username, password) {
		return new Promise(resolve => {
			steem.api.getAccounts([ username ], async (err, acc) => {
			var imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
			if(acc.length > 0) {
			  	const pubKey = acc[0].posting.key_auths[0][0]
			  	const { posting } = steem.auth.getPrivateKeys(username, password, ['posting'])
			  	const isValid = steem.auth.wifIsValid(posting, pubKey)

			  	if(JSON.parse(acc[0].json_metadata)['profile']) {
			  		imageUrl = JSON.parse(acc[0].json_metadata)['profile']['profile_image']
			  	}
				if(isValid) {
					var customToken
					try {
						customToken = await firebase.createCustomToken(username)
					} catch(error) {
						console.log(error)
					}

					try {
						await firebase.addUserToFirebase(customToken, username)
					} catch(error) {
						console.log(error)
					}
					resolve({ userLoggedIn: true, username, imageUrl })
				} else {
					resolve({ error: 'Password is incorrect. Please try again.'})
				} 		
			} else {
				resolve({ error: 'Username is incorrect. Please try again.'})
			}
		})
		})
	}

	getUserProfileInfo(username) {
		console.log("in get userprofileinfo")
		return new Promise(async (resolve) => {
			try {
				console.log("in promise")
				var currentlyLoggedInUser =  await firebase.verifyToken()
				console.log("user is " + currentlyLoggedInUser)
				if(currentlyLoggedInUser == username) {
					console.log("in username")
					var listOfPermLinksOfPostsUsersMade = await firebase.getListOfPermLinks(username, "postsAboutBooks")
					var listOfPostUsersMade = await this.getListOfPostsByUser(listOfPermLinksOfPostsUsersMade, username)
					console.log("HEREERE")
					var listOfBookmarkedPermLinks = await firebase.getListOfPermLinks(username, "bookmarks")
					var listOfPostsOfBookmarks = await this.getListOfPostsByUser(listOfBookmarkedPermLinks, username)
					console.log("HERE. " + listOfPostsOfBookmarks)			
					resolve({ listOfPostUsersMade, listOfPostsOfBookmarks })
				}
			} catch (error) {
				resolve(error)
			}
		})
	}

	async getPostsDataFromSteem(permLink, username) {
		return new Promise(resolve => {
			steem.api.getContent(username, permLink, function(err, result) {
				resolve(result)
			})
		})
	}

	async getListOfPostsByUser(listOfPermLinks, username) {
		console.log("a")
		var listOfPosts = []
		return new Promise(async (resolve) => {
			console.log("1")
			for(var i = 0; i < listOfPermLinks.length; i++) {
				var a = await this.getPostsDataFromSteem(listOfPermLinks[i], username)
				listOfPosts.push(a)
				console.log("sixe " + listOfPosts.length)	
			}
			console.log("4")
			console.log(listOfPosts[2])
			resolve(listOfPosts)
			})

	}	

}