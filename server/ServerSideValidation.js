module.exports = class ServerSideValidation {

	constructor(steem, jwt, secret) {
		this.steem = steem
		this.jwt = jwt
		this.secret = secret
	}

	logUserIn(username, password) {
		return new Promise(resolve => {
			this.steem.api.getAccounts([ username ], (err, acc) => {
		var imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
		
		if(acc.length > 0) {
			//get posting public key
		  	const pubKey = acc[0].posting.key_auths[0][0]

		  	const { posting } = this.steem.auth.getPrivateKeys(username, password, ['posting'])

		  	const isValid = this.steem.auth.wifIsValid(posting, pubKey)

		  	if(JSON.parse(acc[0].json_metadata)['profile']) {
		  		imageUrl = JSON.parse(acc[0].json_metadata)['profile']['profile_image']
		  	}
			if(isValid) {
		  		this.jwt.sign({ username }, this.secret, (err, token) => {
		    		if (err) {
		    			throw err
		    		} else {
	    				var userInfo = { token, username, imageUrl }
	   					resolve(userInfo)
		    		} 
		    	})
			} else {
				resolve( { error: 'Password is incorrect. Please try again.'})
			} 		
		} else {
			resolve({ error: 'Username is incorrect. Please try again.'})
		}
	})
	})
}
}