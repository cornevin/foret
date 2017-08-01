import React, { Component } from 'react'
import treeImage from '../assets/images/tree.png'
import './style.css'
import { withRouter } from 'react-router-dom'
import * as firebase from '../core/firebase'
import { Form, Grid, Label } from 'semantic-ui-react'

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

const withInfo = graphql(GetRepositoryInfoQuery, {
  options: ({ login, name }) => {
    return {
      variables: {
        login: 'facebook',
        name: 'react'
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


class Home extends Component {

  constructor(props) {
    super(props)
    this.joinRoom = this.joinRoom.bind(this)
    this.state = {
      userName: '',
      showErrorMessage: false,
      ogin: props.login,
      name: props.name,
      stargazers: 0,
      watchers: 0,
    }
  }

  componentWillReceiveProps(newProps) {
    // DRY
    const repo = newProps.data.repositoryOwner.repository;

    // states
    this.setState({
      login: this.props.login,
      name: this.props.name,
      stargazers: repo.stargazers.totalCount,
      watchers: repo.watchers.totalCount
    });
  }


  joinRoom() {
    if (this.state.userName === '') {
      this.setState({
        showErrorMessage: true
      })
    }
    else {
      firebase.addUserToRoom(this.state.userName)
      this.props.history.push("/room")
    }
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  render() {
    return (
      <Grid centered columns={2} className="home-grid">
        <h2>{this.state.login}/{this.state.name}</h2>
      <ul>
        <li>stargazers: {this.state.stargazers.toLocaleString()}</li>
        <li>watchers: {this.state.watchers.toLocaleString()}</li>
      </ul>
        <Form onSubmit={this.joinRoom}>
          <img src={treeImage} alt="app logo" style={{ height: 200 }} />
          <h1> Welcome to foret </h1>
          <Form.Group>
            <Form.Field>
              <Form.Input
                onChange={this.handleChange}
                value={this.state.userName}
                placeholder='Enter your username ...'
                action={{ color: 'teal', labelPosition: 'right', content: 'Join the Room', type: 'submit', icon: 'home' }} />
              {this.state.showErrorMessage ?
                <Label basic color='red' pointing>Please enter a username</Label> : null}
            </Form.Field>
          </Form.Group>
        </Form>
      </Grid>
    )
  }
}

export default withInfo(withRouter(Home))
