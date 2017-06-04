var PubSub = require('pubsub-js');

class ChartSocketListener {

  constructor(socketUri) {
    this.socketUri = socketUri;
  }

  start() {
    this.socket = new WebSocket(this.socketUri);

    this.socket.onmessage = function (event) {
      var eventJson = JSON.parse(event.data);
      PubSub.publish(eventJson.msg, eventJson.data);
    }
  }

  stop() {
    this.socket.close();
  }

}

export default ChartSocketListener;
