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
    return <div ref="chart"/>
  }

  componentDidMount() {
    var chartContainer = this.refs.chart;
    var chart = this.createChartIn(chartContainer);
  }

  componentWillUnmount() {
    if (this.liveUpdateHandler) {
      PubSub.unsubscribe(this.liveUpdateHandler);
    }

    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChartIn(domElement) {

    var _self = this;

    this.chart = HighCharts.chart(domElement, {
      chart: {
        type: 'line',
        animation: HighCharts.svg,
        events: {
          load: function() {
            var updateSeries = _self.updateChart.bind(_self, this);

            _self.getLatestData()
              .then(data => data.map(_self.toChartPoint)
              .forEach(updateSeries))
              .then(_self.keepChartUpdated(this));
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
        title: {
          text: this.props.yLabel
        },
        plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }],
      },
      series: [
        {
          'name': 'Time',
          'data': this.data
        }
      ],
      plotOptions: {
      series: {
          marker: {
              enabled: true
          }
      }
    }
    });

    return this.chart;
  }

  keepChartUpdated(series) {
    this.liveUpdateHandler = PubSub.subscribe(this.props.topic, (msg, data) => this.updateChart(series, this.toChartPoint(data)));
  }

  toChartPoint(dataPoint) {
    return dataPoint;
  }

  updateChart(chart, chartPoint) {
    var series = chart.series[0];
    var shift = series.data.length >= this.props.displayedPoints;

    series.addPoint(chartPoint, false, shift);
    chart.redraw();

    // Without this, there's a weird gap to the right of the chart for
    // some reason
    chart.reflow();
  }

}

export default LiveLineChart;
