import React, { Component } from 'react'
import tree from './tree.png'
import './style.css'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as firebase from '../core/firebase'

class Home extends Component {

  constructor(props) {
    super(props)
    this.joinRoom = this.joinRoom.bind(this)
    const rootRef = firebase.database.ref().child('foret')
  }

  joinRoom() {
    this.props.history.push("/room");
  }

  render() {
    return (
    <div className="home">
      <img src={tree} alt="app logo" style={{ height: 200 }} />
      <div>
        <h1> Welcome to foret </h1>
      </div>
      <div onClick={this.joinRoom}>
        <RaisedButton label="Join the Room" labelColor="#FFFFFF" backgroundColor="#20855D" style={{margin: 12}} />
      </div>
    </div>
    )
  }
}

export default withRouter(Home)
