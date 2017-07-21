import React from 'react'
import Countdown from './countdown'
import TasksComponent from './tasks'
import { } from './style.css'
import tree from './tree.png'

const Room = () => (
  <div className="container">
    <div className="left">
      <div className="content">
        <img src={tree} alt="app logo" style={{ height: 200 }} />
        <Countdown initialCount={1500} />
      </div>
    </div>
    <div className="right">
      <TasksComponent />
    </div>
  </div>
)

export default Room
