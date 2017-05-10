import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import LiveLineChart from "./charts/liveLineChart";

var testData = [
  {x: 1494457845, y: 22},
  {x: 1494497845, y: 33}
];

var titleText = "stuff and things";

var topicName = "topicarooni";

class App extends Component {

  render() {

    return (
      <div class="temperature">
        <LiveLineChart topic={topicArooni} data={testData} title={titleText} />
      </div>
    )
  }
}

export default App;
