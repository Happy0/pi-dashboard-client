const React = require('react');

import ChartSocketListener from '../websockets/chart_socket_listener';
import LiveLineChart from './LiveLineChart';

var config = require("../../config.json");

class PerformanceCharts extends React.Component {

  componentDidMount() {
    this.chartSocketListener = new ChartSocketListener(config.websocketUri);
    this.chartSocketListener.start();
  }

  componentWillUnmount() {
    this.chartSocketListener.stop();
  }

  render() {
    var numberOfPoints = 10;

    return (
      <div className="all_charts">
        <div className="perf_chart_container">
          <div className="perf_chart">
          <LiveLineChart
            xLabel="Time"
            yLabel="CPU Usage"
            topic="cpu_usage"
            data={[]}
            title="CPU Usage"
            displayedPoints={numberOfPoints}
            endpoint={"/cpu/recent?limit=" + numberOfPoints} />
            </div>
        </div>
        <div className="perf_chart_container">
          <LiveLineChart className="perf_chart"
            xLabel="Time"
            yLabel="CPU Temperature"
            topic="cpu_temperature"
            data={[]}
            title="CPU Temperature"
            displayedPoints={numberOfPoints}
            endpoint={"/temperatures/recent?limit=" + numberOfPoints} />
        </div>
      </div>
    )
  }
}

export default PerformanceCharts;
