var PubSub = require('pubsub-js');

class ChartSocketListener {

  constructor(socketUri) {
    this.socketUri = socketUri;
  }

  start() {
    var socket = new WebSocket(this.socketUri);

    socket.onmessage = function (event) {
      var eventJson = JSON.parse(event.data);
      PubSub.publish(eventJson.msg, eventJson.data);
    }
  }

}

export default ChartSocketListener;
