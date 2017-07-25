import React, { Component } from 'react'
import * as firebase from '../../core/firebase'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'

export default class userPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userList: {}
    }
  }

  componentDidMount() {
    const user = firebase.database.ref('foret/users')
    user.once('value').then((result) => {
      this.setState({
        userList: result.val()
      })
    })
  }

  render() {
    const displayUser = Object.keys(this.state.userList).map(function (key) {
      return (
        <ListItem
          key={key}
          primaryText={this.state.userList[key]}
          leftAvatar={<Avatar backgroundColor="#20855D"/>}
        />)
    }, this);

    return (
      <div>
        <List>
          <Subheader>User list</Subheader>
          {displayUser}
        </List>
      </div>
    )
  }
}
