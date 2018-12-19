var jwt = require('jsonwebtoken')
var steem = require('steem')

module.exports = class ServerSideValidation {
	logUserIn(username, password, secret) {
		return new Promise(resolve => {
			steem.api.getAccounts([ username ], (err, acc) => {
			var imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
		
			if(acc.length > 0) {
			  	const pubKey = acc[0].posting.key_auths[0][0]
			  	const { posting } = steem.auth.getPrivateKeys(username, password, ['posting'])
			  	const isValid = steem.auth.wifIsValid(posting, pubKey)

			  	if(JSON.parse(acc[0].json_metadata)['profile']) {
			  		imageUrl = JSON.parse(acc[0].json_metadata)['profile']['profile_image']
			  	}
				if(isValid) {
			  		jwt.sign({ username }, secret, (err, token) => {
			    		if (err) {
			    			throw err
			    		} else {
		    				var userInfo = { token, username, imageUrl }
		   					resolve(userInfo)
			    		} 
			    	})
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