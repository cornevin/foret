import React, { Component } from 'react'
import * as firebase from '../../core/firebase'

export default class userPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userList: {},
    }
  }

  componentDidMount() {
    const user = firebase.database.ref('foret/users')
    user.once('value').then((result) => {
      console.log(result.val())
      this.setState({
        userList: result.val()
      })
    })

  }

  render() {
    const displayUser = Object.keys(this.state.userList).map(function (key) {
      return <li value={key}>{this.state.userList[key]}</li>
    }, this);

    return (
      <div>
        <h1> User list </h1>
        <ul>{displayUser}</ul>
      </div>
    )
  }
}
