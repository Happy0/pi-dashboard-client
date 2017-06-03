import React, { Component } from 'react';

import {Link, Route, BrowserRouter as Router} from 'react-router-dom';

import CommandList from './bash_commands/CommandList';
import PerformanceCharts from './charts/PerformanceCharts';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/commands">Commands</Link></li>
          </ul>
          <div>
            <Route exact path="/" component={PerformanceCharts} />
            <Route path="/commands" component={CommandList} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
