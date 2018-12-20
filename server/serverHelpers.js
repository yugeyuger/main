var jwt = require('jsonwebtoken')
var steem = require('steem')
var firebase = require('firebase')
var NodeRSA = require('node-rsa');
var admin = require('firebase-admin')

var Firebase = require('./firebase')

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
					var firebase = new Firebase()
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
					resolve({ customToken, username, imageUrl })
				} else {
					resolve({ error: 'Password is incorrect. Please try again.'})
				} 		
			} else {
				resolve({ error: 'Username is incorrect. Please try again.'})
			}
		})
		})
	}
}