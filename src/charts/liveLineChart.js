var React = require('react');
var PubSub = require('pubsub-js');

var HighCharts = require('highcharts');

var config = require("../../config.json");

class LiveLineChart extends React.Component {

  constructor (props) {
    super(props);

    this.data = this.props.data;
  }

  getLatestData() {
    var endpoint = this.props.endpoint;
    if (endpoint) {
      var requestUrl = config.baseRestUri + endpoint;
      return fetch(requestUrl).then(result => result.json())
    }
  }

  render() {
    var chartContainer = document.createElement("div");
    this.createChartIn(chartContainer);

    return <div ref={(nodeElement) => {nodeElement.appendChild(chartContainer)}}/>
  }

  createChartIn(domElement) {

    var _self = this;

    this.chart = HighCharts.chart(domElement, {
      chart: {
        type: 'spline',
        animation: HighCharts.svg,
        events: {
          load: function() {
            var series = this.series[0];
            var updateSeries = _self.updateChart.bind(null, series);

            _self.getLatestData().then(data => updateSeries(data.map(_self.toChartPoint)))
              .then(_self.keepChartUpdated(series))
          }
        }
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
          'data': this.data
        }
      ]
    });

  }

  keepChartUpdated(series) {
    PubSub.subscribe(this.props.topic, (msg, data) => this.updateChart(series, this.toChartPoint(data)));
  }

  toChartPoint(dataPoint) {
    return {
      x: dataPoint[0] * 1000,
      y: dataPoint[1]
    }
  }

  updateChart(series, chartPoint) {
    series.addPoint(chartPoint, true, true);
  }

}

export default LiveLineChart;
