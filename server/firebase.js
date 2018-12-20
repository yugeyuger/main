var jwt = require('jsonwebtoken')
var steem = require('steem')
var firebase = require('firebase')
var NodeRSA = require('node-rsa');
var admin = require('firebase-admin')

var privateKeyConfiguration = require('./privateKeyConfiguration.json')
var firebaseConfig = require('./firebaseConfig.js')

module.exports = class ServerSideValidation {
	constructor() {
		if (!firebase.apps.length) {
			console.log(firebase.apps)
			firebase.initializeApp(firebaseConfig.firebaseConfig);
			admin.initializeApp({credential: admin.credential.cert(privateKeyConfiguration)})
		}
	}

	createCustomToken(username) {
		return new Promise(resolve => {
			admin.auth().createCustomToken(username)
				.then((customToken) => {
					resolve(customToken)					
				})
				.catch((error) => {
					console.log(error)
				})
		})
	}

	addUserToFirebase(token, username) {
		return new Promise(resolve => {
			firebase.auth().signInWithCustomToken(token).catch(function(error) {
				if(error){
					console.log(error)
				}
			})
			firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
          		if(!snapshot.val()) {
            		firebase.database().ref('users').child(username).set({
	                latestPostPermlinkIdNumber: 0,
	                bookmarkPosts: "",
	                following: ""
            		});
         		 } 
        	})
			resolve()
		})
	}	
}