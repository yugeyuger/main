import React, { Component } from 'react'
import { Modal,OverlayTrigger, Button} from 'react-bootstrap'

class LoginModal extends Component {
  state = {
    show: ""
  }

  componentWillReceiveProps(nextProps) {
    this.setState({show: nextProps.show});
  }

  handleClose = () => {
    this.setState({show: false});
  }
  render() {
     return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default LoginModal