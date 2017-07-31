import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import * as firebase from '../core/firebase'

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.initialCount,
      timerStarted: false
    }
  }

  handleClick = () => {
    firebase.setUserStatus('busy')
    this.setState({
      timerStarted: true
    })
  }

  render() {
    var self = this;
    var { count } = this.state
    var quotient = Math.floor(count / 60)
    var remainder = count % 60
    if (this.state.timerStarted) {
      setTimeout(() => {
        if (count > 0) {
          self.setState({ count: count - 1 })
        }
      }, 1000)
    }
    return (
      <div>
        <h3>Stay focus for still:</h3>
        <h1>{quotient} : {remainder}</h1>
        <Button onClick={this.handleClick} primary>Start a session</Button>
      </div>)
  }
}
