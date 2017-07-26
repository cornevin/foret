import React, { Component } from 'react'
import treeImage from '../assets/images/tree.png'
import './style.css'
import { withRouter } from 'react-router-dom'
import * as firebase from '../core/firebase'
import { Form, Grid, Label} from 'semantic-ui-react'

class Home extends Component {

  constructor(props) {
    super(props)
    this.joinRoom = this.joinRoom.bind(this)
    this.state = {
      userName: '',
      showErrorMessage: false
    }
  }

  joinRoom() {
    if (this.state.userName === '') {
      this.setState({
        showErrorMessage: true
      })
    }
    else {
    const rootRef = firebase.database.ref().child('foret')
    rootRef.child('users').push({userName: this.state.userName, status: 'available'})
      this.setState({
        userName: ''
      })
      this.props.history.push("/room")
    }
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  render() {
    return (
      <Grid centered columns={2} className="home-grid">
        <Form onSubmit={this.joinRoom}>
          <img src={treeImage} alt="app logo" style={{ height: 200 }}/>
          <h1> Welcome to foret </h1>
          <Form.Group>
            <Form.Field>
              <Form.Input
                onChange={this.handleChange}
                value={this.state.userName}
                placeholder='Enter your username ...'
                action={{color: 'teal', labelPosition: 'right', content: 'Join the Room', type: 'submit', icon:'home'}}/>
              {this.state.showErrorMessage ?
                <Label basic color='red' pointing>Please enter a username</Label> : null}
            </Form.Field>
          </Form.Group>
        </Form>
      </Grid>
    )
  }
}

export default withRouter(Home)
