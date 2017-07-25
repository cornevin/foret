import React, { Component } from 'react'
import TaskForm from './task-form'
import TaskList from './task-list'

let nextTaskId = 0

class TasksComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      tasks: []
    };
  }

  addTask(taskText) {
    const task = {text: taskText, id: nextTaskId++}
    this.state.tasks.push(task)
    this.setState({tasks: this.state.tasks})
  }

  render() {
    return (
      <div>
        <TaskForm addTask={this.addTask.bind(this)} />
        <TaskList tasks={this.state.tasks} />
      </div>
    )
  }
}
export default TasksComponent
