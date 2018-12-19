const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var steem = require('steem')

const app = express()
const port = 3001

var secret = require('./secretKey.json')['secret']
var ServerHelpers = require('./serverHelpers.js')

app.use(bodyParser.json())

app.post('/login', async (req, res) => {
	const { username, password } = req.body
	var serverHelpers =  new ServerHelpers()
	var userInfo = await serverHelpers.logUserIn(username, password, secret)
	res.json(userInfo)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))