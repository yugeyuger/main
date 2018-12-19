const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var steem = require('steem')

const app = express()
const port = 3001

const secret = require('./secretKey.json')['secret']

app.use(bodyParser.json())

app.post('/login', async (req, res) => {
	const { username, password } = req.body

	var ServerSideValidation = require('./ServerSideValidation')
	var ServerSideValidation = new ServerSideValidation(steem, jwt, secret)
	var userInfo = await ServerSideValidation.logUserIn(username, password)
	res.json(userInfo)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))