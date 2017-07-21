import React from 'react'
import Task from './task'

const TaskList = ({tasks}) => {
  const taskNode = tasks.map((task) => {
    return (<Task task={task} key={task.id} />)
  })
  return (<ul>{taskNode}</ul>)
}

export default TaskList
