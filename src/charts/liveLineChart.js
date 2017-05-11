var React = require('react');
var PubSub = require('pubsub-js');

var HighCharts = require('highcharts');

var dataLength = 500;

class LiveLineChart extends React.Component {

  render() {
    var chartContainer = document.createElement("div");
    this.createChartIn(chartContainer);

    return <div ref={(nodeElement) => {nodeElement.appendChild(chartContainer)}}/>
  }

  createChartIn(domElement) {
    var chart = HighCharts.chart(domElement, {
      chart: {
        type: 'spline'
      },
      title: {
        text: this.title
      },
      xAxis: {
        type: 'datetime'
      },
      series: [
        {
          'name': 'blah',
          'data': this.data
        }
      ]
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
