import React, { Component } from 'react';
import './App.css';

import LiveLineChart from './charts/liveLineChart';

var testData = [
  [1494457845, 22]
];

var titleText = "CPU Temperature";
var xLabel = "Time";
var yLabel = "Temperature";

var topicName = "cpu_temperature";

class App extends Component {

  render() {

    return (
      <div className="temperature">
        <LiveLineChart xLabel={xLabel} yLabel={yLabel} topic={topicName} data={testData} title={titleText}
          endpoint="/temperatures/recent"/>
      </div>
    )
  }
}

export default App;
