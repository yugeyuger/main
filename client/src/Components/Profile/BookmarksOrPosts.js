import React, { Component } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {  Feed, Menu, Image, Icon} from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";
import ReactLoading from 'react-loading';

import BookMarkOption from './BookMarkOption'
import '../../assets/myOwnProfilePage.css'

var moment = require('moment');

class BookmarksOrPosts extends Component {

	state = {
		dataToSee: [],
		goToPostPage: false,
		postDataForPostPage: [],
		goToProfilePage: false,
		profilePageToGoTo: '',
		removeLoading: false,
		username: ''
	}

	static getDerivedStateFromProps(props, state) {
		var data = []
		var removeLoading: false
		if(props.dataToSee) {
			for(var elem in props.dataToSee) {
				data.push(props.dataToSee[elem])
		}
		if(props.removeLoading) {
			removeLoading = props.removeLoading
		}
		return {
			dataToSee: data,
			removeLoading: removeLoading
			}			
		}
	}

	goToPostPage = (item)=> {
		this.setState({ goToPostPage: true, postDataForPostPage: item})
 	}

 	goToProfilePage = (item) => {
 		if(item['userAccountInfo']['username'] == JSON.parse(localStorage.getItem("loginStatus")).username) {
 			window.location.reload(); 
 		} else {
 			this.setState({ username: item['userAccountInfo']['username'], goToProfilePage: true })
 		}
 	}
	renderUserData() {
		if(this.state.goToProfilePage) {
			var username = this.state.username
			console.log(username)
			return <Redirect to={{ pathname: '@' + username }} />;			
		}
		if(this.state.goToPostPage) {
			var postDataForPostPage = this.state.postDataForPostPage
			return <Redirect to={{ 
												pathname: '@' + postDataForPostPage['userAccountInfo']['username'] + '/' + postDataForPostPage['permLink'],
												state: {postDetails: postDataForPostPage} 
											}} 
										/>;
		}
		if(this.state.dataToSee.length == 0) {
			return <div></div>
		}
		return this.state.dataToSee.map((item, i) => {
		    return (
			    <Feed.Event className="postFeed">
			      <Feed.Label onClick={() => this.goToProfilePage(item)} className="clickable" image={item['userAccountInfo']['imageUrl']}/>
			      <Feed.Content className="postFeedContent">
			        <Feed.Summary>
			          <a onClick={() => this.goToProfilePage(item)} className="postUsername clickable">{item['userAccountInfo']['username']}</a> <a className="genre clickable">•&nbsp;{item['genre']}&nbsp;•&nbsp;</a>
			          <a className="howLongAgo">{moment.utc(item["created"], "YYYY-MM-DD hh:mm:ss").fromNow()}</a>
			          <BookMarkOption activeItem = {this.props.tab} floated="right" />
			        </Feed.Summary>
			        <Feed.Summary >
			          <h4 className="postTitle clickable" onClick={() => this.goToPostPage(item)}>{item["title"]}</h4> 
			        </Feed.Summary>
			        <Feed.Extra images>
			          <a>
			            <Image rounded src='https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg' size='mini' />
			          </a>
			        </Feed.Extra>
				        <Feed.Extra text className="contentParent clickable" onClick={() => this.goToPostPage(item)}>
				        	<p className="postContent">{ReactHtmlParser(item["content"].substring(0, 250))} ...</p>
				        </Feed.Extra>
			        <Feed.Meta>
			          <Feed.Like>
			            <p className="likes"><Icon className="heart" disabled name='like' />{item["votes"]} likes </p>
			          </Feed.Like>
			        </Feed.Meta>
			      </Feed.Content>
			    </Feed.Event>
		  )
		})

	}

	render() {
		if(!this.state.removeLoading) {
			return <ReactLoading  className="loading" type="spin" height={80} width={80} />
		}
		return (<Feed>
			{ this.renderUserData() }
		   	</Feed>
		)

	}
}

export default BookmarksOrPosts