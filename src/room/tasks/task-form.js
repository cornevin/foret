import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'

class TaskForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }
  onAddTask = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.value);
    this.setState({
      value: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.onAddTask} >
        <Input
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Enter your goal here ..."
           />

        <Button
          labelColor="#FFFFFF"
          backgroundColor="#48a16f"
          type="submit">
          Add Goal
          </Button>
      </form>
    )
  }
}


export default TaskForm
