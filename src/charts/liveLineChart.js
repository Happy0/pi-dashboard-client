var React = require('react');
var CanvasJS = require('canvasjs');
var PubSub = require('pubsub-js');

import CanvasJS from 'canvasjs';

class LiveLineChart {

  var dataLength = 500;

  constructor(topicName, title, xLabel, yLabel, initialData, units) {
    this.topicName = topicName;
    this.title = title;
    this.xLabel = xLabel;
    this.yLabel = yLavel;
    this.data = initialData;
    this.units = units;
  }

  function create(domElement) {
    var chart = new CanvasJS.Chart(domElement, {
      title: {
        text: this.title
      },
      axisX:{
      valueFormatString: "hh:mm:ss TT" ,
      labelAngle: -50
    },

      data: [
        {
          type: "line",
          xValueType: "dateTime",
          dataPoints: this.data;
        }
      ]
    });

    subscribeToChanges(chart);
  }

  function updateChart(chart, dataPoint) {
    const dPoint = giveDatapointDisplayTime(dataPoint);

    this.data.push(dPoint);

    if (this.data.length > dataLength) {
      this.data.shift();
    }
  }

  function subscribeToChanges(chart) {
    PubSub.subscribe(topic, (msg, data) => updateChart(chart, data));
  }
}

export default LiveLineChart;
