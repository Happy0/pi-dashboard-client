var React = require('react');
var PubSub = require('pubsub-js');

import CanvasJS from 'canvasjs';

var dataLength = 500;

class LiveLineChart extends React.Component {

  render() {
    var chartContainer = document.createElement("div");
    this.createChartIn(chartContainer);

    return <div ref={(nodeElement) => {nodeElement.appendChild(chartContainer)}}/>
  }

  createChartIn(domElement) {
    var chart = new CanvasJS.Chart(domElement, {
      title: {
        text: this.title
      },
      axisX: {
        valueFormatString: "hh:mm:ss TT",
        labelAngle: -50
      },

      data: [{
        type: "line",
        xValueType: "dateTime",
        dataPoints: this.data
      }]
    });

    this.subscribeToChanges(chart);
  }

  updateChart(chart, dataPoint) {

    this.data.push(dataPoint);

    if (this.data.length > dataLength) {
      this.data.shift();
    }
  }

  subscribeToChanges(chart) {
    PubSub.subscribe(this.topic, (msg, data) => this.updateChart(chart, data));
  }
}

export default LiveLineChart;
