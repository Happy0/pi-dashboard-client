const React = require('react');
const config = require("../../config.json");

class CommandList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      commandsList: []
    };
  }

  componentDidMount() {
    const baseRestUri = config.baseRestUri;
    const bashCommandsUri = baseRestUri + "/bash_commands";

    fetch(bashCommandsUri).then(result => {
      const resultJson = result.json();
      this.state.commandsList = resultJson;
    });
  }

  render() {
    return <div>
      {this.state.commandsList.map(command => {
        <div>
          <p>command.id</p>
          <p>command.command</p>
        </div>
      })}
    </div>
  }

}

export default CommandList;
