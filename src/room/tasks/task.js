import React, { Component } from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// GraphQL
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const addHooray = gql`
  mutation AddReactionToIssue {
    addReaction(input:{subjectId:"MDU6SXNzdWUyNDcwMzk1Mzg=",content:HOORAY}) {
      reaction {
        content
      }
      subject {
        id
      }
    }
  }
`;

class Task extends Component {
  constructor(props) {
    super(props)
    this.state.task = props.task
  }
  // follow this tuto http://dev.apollodata.com/react/mutations.html

  render() {
    return (
      <Card style={{ backgroundColor: '#287359', margin: '10px' }}>
        <CardHeader
          title={this.state.task.text}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <FlatButton label="Add HOORAY to issue" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    )
  }
}


export default Task
