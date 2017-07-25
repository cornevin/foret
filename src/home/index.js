import React, { Component } from 'react'
import tree from './tree.png'
import './style.css'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as firebase from '../core/firebase'
import TextField from 'material-ui/TextField'

class Home extends Component {

  constructor(props) {
    super(props)
    this.joinRoom = this.joinRoom.bind(this)
    this.state = {
      userName: '',
    }
  }

  joinRoom() {
    const rootRef = firebase.database.ref().child('foret')
    rootRef.child('users').push(this.state.userName)
    if (this.state.userName !== '') {
      this.setState({
        userName: ''
      })
      this.props.history.push("/room");
    }
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  render() {
    return (
      <div className="home">
        <img src={tree} alt="app logo" style={{ height: 200 }} />
        <div>
          <h1> Welcome to foret </h1>
        </div>
        <TextField
          value={this.state.userName}
          onChange={this.handleChange}
          hintText="Enter your username ..."
          floatingLabelStyle={{ color: "#FFFFFF" }}
        />
        <div onClick={this.joinRoom}>
          <RaisedButton label="Join the Room" labelColor="#FFFFFF" backgroundColor="#20855D" style={{ margin: 12 }} />
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
