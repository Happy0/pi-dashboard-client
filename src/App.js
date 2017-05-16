import React, { Component } from 'react';
import './App.css';

import LiveLineChart from './charts/liveLineChart';

var defaultData = [
];

var titleText = "CPU Temperature";
var xLabel = "Time";
var yLabel = "Temperature";

var topicName = "cpu_temperature";

var displayedPoints = 50;

class App extends Component {

  render() {

    return (
      <div className="temperature">
        <LiveLineChart xLabel={xLabel} yLabel={yLabel} topic={topicName} data={defaultData} title={titleText} displayedPoints={displayedPoints}
          endpoint={"/temperatures/recent?limit=" + displayedPoints} />
      </div>
    )
  }
}

export default App;
