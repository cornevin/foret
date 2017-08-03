import React, { Component } from 'react'
import { Button, Form, Label, Grid } from 'semantic-ui-react'

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
      <Grid centered columns={4}>
        <Form onSubmit={this.onAddTask}>
          <Form.Group>
            <Form.Field>
              <Form.Input
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Enter your goal here ..." action>
                <input/>
                <Button type='submit' color="teal">Add Task</Button>
              </Form.Input>
              {this.state.showErrorMessage ?
                <Label basic color='red' pointing>Please enter a username</Label> : null}
            </Form.Field>
          </Form.Group>
        </Form>
      </Grid>
    )
  }
}


export default TaskForm
