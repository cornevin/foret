import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'
import Home from './home'
import Room from './room'
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
