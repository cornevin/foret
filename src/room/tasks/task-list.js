import React, { Component } from 'react'
import Task from './task'

// GraphQL
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GetRepositoryInfoQuery = gql`
  query GetRepositoryIssues($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
      }
    }
  }
`;

const getLastIssues = gql`
  query GetRepositoryIssues {
     repository(owner:"Cornevin", name:"foret") {
      issues(first:10) {
      nodes {
        author {
          login
        }
        bodyText
        comments(first:10) {
          nodes {
            author {
              login
            }
            bodyText
          }
        }
      }
    }}
  }
`;

const withInfo = graphql(getLastIssues, {
  options: ({ login, name }) => {
    return {
      variables: {
        login: 'Cornevin',
        name: 'foret'
      }
    }
  },
  props: ({ data }) => {
    // loading state
    if (data.loading) {
      return { loading: true };
    }

    // error state
    if (data.error) {
      console.error(data.error);
    }

    // OK state
    return { data };
  },
});

class TaskList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks: props.tasks,
      login: props.login,
      name: props.name,
      stargazers: 0,
      watchers: 0,
    }
  }

  componentWillReceiveProps(newProps) {
    // DRY
    const issues = newProps.data.repository.issues.nodes[0];
    //const repo = newProps.data.repository.issues.nodes;
    // states
    this.setState({
      login: this.props.login,
      name: this.props.name,
      stargazers: issues.author.login,
      watchers: issues.bodyText
    });
  }


  render() {
    const taskNode = this.state.tasks.map((task) => {
      return (<Task task={task} key={task.id} />)
    })
    return (<div>
      <ul>
        <li>Issue author: {this.state.stargazers.toLocaleString()}</li>
        <li>issue text: {this.state.watchers.toLocaleString()}</li>
      </ul>
      <ul>{taskNode}</ul>
    </div>
    )
  }
}

export default withInfo(TaskList)
