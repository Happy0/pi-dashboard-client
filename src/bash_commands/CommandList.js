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
    const invokeCommand = (command) => {
      const baseRestUri = config.baseRestUri;
      const postCommand = baseRestUri + "/bash_commands/" + command.id;

      fetch(postCommand, {
        method: 'POST'
      })
    }

    return (
       <button className="btn" onClick={(e) => invokeCommand(command)} title={command.Description}>{command.name}</button>
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
