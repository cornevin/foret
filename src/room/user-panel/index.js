import React, { Component } from 'react'
import * as firebase from '../../core/firebase'
import { Image, List } from 'semantic-ui-react'
import Subheader from 'material-ui/Subheader'

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
        <List.Item key={key}>
          <Image avatar src='/assets/images/tree.png' />
          <List.Content>
            <List.Header>{this.state.userList[key]}</List.Header>
          </List.Content>
        </List.Item>
      )
    }, this);

    return (
      <div>
        <List selection verticalAlign='middle'>
          <Subheader>User list</Subheader>
          {displayUser}
        </List>
      </div>
    )
  }
}
