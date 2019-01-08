const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var steem = require('steem')

const app = express()
const port = 3001

var ServerHelpers = require('./serverHelpers.js')
var serverHelpers =  new ServerHelpers()

app.use(bodyParser.json())

app.post('/login', async (req, res) => {
	const { username, password } = req.body
	var userinfo
	try {
		userInfo = await serverHelpers.logUserIn(username, password)
		res.json(userInfo)
	} catch(error) {
		console.log(error)
	}
})

app.get('/@', async (req, res) => {
	var userProfileInfo = await serverHelpers.getUserProfileInfo(req.query.username)
	res.json({ userProfileInfo  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))