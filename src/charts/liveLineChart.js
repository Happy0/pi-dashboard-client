var React = require('react');
var PubSub = require('pubsub-js');

var HighCharts = require('highcharts');

var config = require("../../config.json");

var dataLength = 500;

class LiveLineChart extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  componentDidMount() {
    var endpoint = this.props.endpoint;
    if (endpoint) {
      var requestUrl = config.baseRestUri + endpoint;
      fetch(requestUrl).then(result =>
        result.json().then(json =>
          this.setState({data: json})));
    }
  }

  render() {
    var chartContainer = document.createElement("div");
    this.createChartIn(chartContainer);

    return <div ref={(nodeElement) => {nodeElement.appendChild(chartContainer)}}/>
  }

  createChartIn(domElement) {
    console.dir(this.state.data);

    var chart = HighCharts.chart(domElement, {
      chart: {
        type: 'spline'
      },
      title: {
        text: this.props.title
      },
      xAxis: {
        type: 'datetime',
        text: this.props.xLabel
      },
      yAxis: {
        type: 'celcius',
        title: {
          text: this.props.yLabel
        }
      },
      series: [
        {
          'name': 'Time',
          'data': this.state.data
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
    PubSub.subscribe(this.props.topic, (msg, data) => this.updateChart(chart, data));
  }
}

export default LiveLineChart;
