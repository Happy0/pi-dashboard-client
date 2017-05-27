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

    fetch(bashCommandsUri).then(result => result.json().then(resultJson => {
      this.setState( { commandsList: resultJson } )
    }));
  }

  renderCommand(command) {
    return (
       <div>
        <p>{command.id}</p>
        <p>{command.command}</p>
      </div>
    )
  }

  render() {
    var commandList = this.state.commandsList.map(this.renderCommand);
    return (
      <div>
        {commandList}
      </div>
    )
  }

}

export default CommandList;
