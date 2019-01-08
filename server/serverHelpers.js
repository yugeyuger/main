var jwt = require('jsonwebtoken')
var steem = require('steem')
var NodeRSA = require('node-rsa');
var admin = require('firebase-admin')

var Firebase = require('./firebase')
var firebase = new Firebase()

module.exports = class ServerHelpers {

	async getUserAccountInformation(username) {
		return new Promise(resolve => {
			steem.api.getAccounts([ username ], async (err, acc) => {
				var imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
			  	if(acc[0].json_metadata){
				  	if(JSON.parse(acc[0].json_metadata)['profile']) {
				  		imageUrl = JSON.parse(acc[0].json_metadata)['profile']['profile_image']
				  	}			  		
			  	}

				resolve({ imageUrl, username });
			})			
		})


	}

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
		return new Promise(async (resolve) => {
			try {
				var currentlyLoggedInUser =  await firebase.verifyToken()
				if(currentlyLoggedInUser == username) {
					var objOfPermLinksOfPostsUsersMade = await firebase.getListOfPermLinks(username, "postsAboutBooks")
					var listOfPermLinksPosts = []
					for(var elem in objOfPermLinksOfPostsUsersMade) {
						listOfPermLinksPosts = objOfPermLinksOfPostsUsersMade[elem][username]
					}
					var listOfPostUsersMade = await this.getListOfPostsByUser(listOfPermLinksPosts, username)
					var listOfPostsOfBookmarks = []
					var listOfPermLinksBookmarks = []
					var objOfBookmarkedPermLinks = await firebase.getListOfPermLinks(username, "bookmarks")
					for(var user in objOfBookmarkedPermLinks) {
						for(var elem of objOfBookmarkedPermLinks[user]) {
							listOfPermLinksBookmarks.push(elem)
						}
						var posts = await this.getListOfPostsByUser(listOfPermLinksBookmarks, user)
						for(var post of posts) {
							listOfPostsOfBookmarks.push(post)
						}
					}
					resolve({ listOfPostUsersMade, listOfPostsOfBookmarks })
				}
			} catch (error) {
				resolve(error)
			}
		})
	}

	async getPostsDataFromSteem(permLink, username) {
		return new Promise(resolve => {
			steem.api.getContent(username, permLink, async (err, result) => {
				var userAccountInfo
				try{
					userAccountInfo = await this.getUserAccountInformation(username)
				} catch(error) {
					console.log(error)
				}
				var title = result['title']
				var votes = result['active_votes'].length
				var created = result['created']
				var content = result['body']
				var genre = JSON.parse(result['json_metadata'])['tags'][1]
				resolve({userAccountInfo, genre, created, content, votes, title, permLink})
			})
		})
	}

	async getListOfPostsByUser(listOfPermLinks, username) {
		var listOfPosts = []
		return new Promise(async (resolve) => {
			for(var i = 0; i < listOfPermLinks.length; i++) {
				var a = await this.getPostsDataFromSteem(listOfPermLinks[i], username)
				listOfPosts.push(a)
			}
			resolve(listOfPosts)
			})

	}	

}