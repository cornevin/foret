import React, { Component } from 'react'
import * as firebase from '../../core/firebase'
import { Image, List, Divider } from 'semantic-ui-react'
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
          <Image avatar src={require('../../assets/images/user/'+ Math.floor((Math.random() * 24) + 1) +'.jpg')} />
          <List.Content>
            <List.Header>{this.state.userList[key].userName}</List.Header>
            {this.state.userList[key].status}
          </List.Content>
          <Divider />
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
