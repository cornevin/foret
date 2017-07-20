import React, { Component } from 'react'

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = { count: props.initialCount }
  }

  render() {
    var self = this;
    var { count } = this.state
    var quotient = Math.floor(count / 60)
    var remainder = count % 60
    setTimeout(() => {
      if (count > 0) {
        self.setState({ count: count - 1 })
      }
    }, 1000)
    return (
      <div>
        <h3>Stay focus for still:</h3>
        <h1>{quotient} : {remainder}</h1>
      </div>)
  }
}
