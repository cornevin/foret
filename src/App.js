import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import Home from './home'
import Room from './room'
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom'

// Apollo
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

// Auth
import { login } from './core/githubLogin';
import { username, password } from './config';

// Global.Auth
let TOKEN = null;

// Global.Apollo
const networkInterface = createNetworkInterface('https://api.github.com/graphql');

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // Send the login token in the Authorization header
    req.options.headers.authorization = `Bearer ${TOKEN}`;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
  constructor() {
    super();
    this.state = { login: false };
  }

  componentDidMount() {
    if (username === 'xxx') {
      throw new Error('Please create a config.js your username and password.');
    }
    login(username, password).then(token => {
      TOKEN = token;
      this.setState({ login: true });
    });
  }

  render() {// Log in state
    if (!this.state.login) {
      return <p>Login...</p>
    }

    // Logged in, fetch from Github
    return this.state.login ? (
      <ApolloProvider client={client}>
        <MuiThemeProvider>
          <div className="App">
            <Router>
              <div>
                <Route exact path='/' component={Home} />
                <Route path='/room' component={Room} />
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
      </ApolloProvider>
    ) : <p>Logging in...</p>;
  }
}

export default App;
