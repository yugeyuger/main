const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var steem = require('steem')

const app = express()
const port = 3001

var ServerHelpers = require('./serverHelpers.js')

app.use(bodyParser.json())

app.post('/login', async (req, res) => {
	const { username, password } = req.body
	var serverHelpers =  new ServerHelpers()
	var userinfo
	try {
		userInfo = await serverHelpers.logUserIn(username, password)
	} catch(error) {
		console.log(error)
	}
	res.json(userInfo)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))