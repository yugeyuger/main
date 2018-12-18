const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var steem = require('steem')

const app = express()
const port = 3001

const secret = require('./secretKey.json')['secret']

app.use(bodyParser.json())

app.post('/login', (req, res) => {
	const { username, password } = req.body

	steem.api.getAccounts([ username ], (err, acc) => {
		var imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png'
		
		if(acc.length > 0) {
			//get posting public key
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
		   				 res.json({ token, username, imageUrl })
		    		} 
		    	})
			} else {
				res.json({ error: 'Password is incorrect. Please try again.'})
			} 		
		} else {
			res.json({ error: 'Username is incorrect. Please try again.'})
		}
	})
})

app.listen(port, () => console.log(`App listening on port ${port}!`))