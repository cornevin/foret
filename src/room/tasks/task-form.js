import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class TaskForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          hintText="Enter your goal here ..."
          floatingLabelStyle={{ color: "#FFFFFF" }}
           />


        <RaisedButton label="Add goal"
          labelColor="#FFFFFF"
          backgroundColor="#48a16f"
          style={{ margin: 12 }}
          onClick={() => {
            this.props.addTask(this.state.value);
            this.setState({
              value: ''
            })
          }} />

      </div>
    )
  }
}


export default TaskForm
