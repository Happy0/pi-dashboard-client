import React, { Component } from 'react';
import './App.css';

import ChartSocketListener from './websockets/chart_socket_listener';
import LiveLineChart from './charts/liveLineChart';

var config = require("../config.json");

var defaultData = [
];

var titleText = "CPU Temperature";
var xLabel = "Time";
var yLabel = "Temperature";

var topicName = "cpu_temperature";

var displayedPoints = 20;

class App extends Component {

  componentDidMount() {
    var chartSocketListener = new ChartSocketListener(config.websocketUri);
    chartSocketListener.start();
  }

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
