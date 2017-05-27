import React, { Component } from 'react';

import CommandList from './bash_commands/CommandList';
import PerformanceCharts from './charts/PerformanceCharts';

class App extends Component {

  render() {
    return (
      <div>
        <PerformanceCharts/>
        <CommandList/>
      </div>
    )
  }
}

export default App;
