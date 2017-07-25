import React from 'react'
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Task = ({task}) => {
  // Each Todo
  return (
  <Card style={{ backgroundColor: '#287359', margin: '10px' }}>
    <CardHeader
      title={task.text}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>);
}

export default Task
