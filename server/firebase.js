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
			firebase.initializeApp(firebaseConfig.firebaseConfig);
			admin.initializeApp({credential: admin.credential.cert(privateKeyConfiguration)})
		}
	}

	async createCustomToken(username) {
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

	verifyToken() {
		return new Promise(resolve => {
			firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
			  admin.auth().verifyIdToken(idToken)
				  .then(function(decodedToken) {
				    var uid = decodedToken.uid;
				    resolve(uid)
				  }).catch(function(error) {
				    resolve(error)
				  });
			}).catch(function(error) {
				console.log(error)
			  resolve(error)
			});
		})
	}

	getListOfPermLinks(username, type) {
		return new Promise(resolve => {
        	firebase.database().ref('/users/' + username).once('value').then(function(snapshot) {
        		if(type == "postsAboutBooks") {
        			var postsAboutBooks = snapshot.val().postsAboutBooks
        			resolve({ postsAboutBooks })
        		} else if(type == "bookmarks") {
	       			var bookmarks = snapshot.val().bookmarks
	       			console.log(bookmarks)
        			resolve(bookmarks)        			
        		}
			})		
		})

	}

	async logOutUser() {
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}, function(error) {
		  // An error happened.
		});
	}
}