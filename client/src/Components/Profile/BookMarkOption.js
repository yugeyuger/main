import { Button, Popup, Icon } from 'semantic-ui-react'
import React, { Component } from 'react'

class BookMarkOption extends Component {
	static getDerivedStateFromProps(props, state) {
		var bookmarkOrRemoveBookmark
		if(props.activeItem) {
			if(props.activeItem == "Posts About Books") {
				bookmarkOrRemoveBookmark = "Add to Bookmarks"		
			} else {
				bookmarkOrRemoveBookmark = "Remove from Bookmarks"						
			}
		}

		return {
			bookmarkOrRemoveBookmark: bookmarkOrRemoveBookmark
			}			
		}
	

	state = {
		bookmarkOrRemoveBookmark: "Add to Bookmarks"
	}
	render() {
		console.log(this.state.bookmarkOrRemoveBookmark)
		return (
		  <Popup
		    trigger={<Icon name="options" className="bookMarkOption"/>}
		    content={<Button className="addToBookMarksButton" content={this.state.bookmarkOrRemoveBookmark} />}
		    on='click'
		    position='top right'
		  />
			)
	}
}

export default BookMarkOption
