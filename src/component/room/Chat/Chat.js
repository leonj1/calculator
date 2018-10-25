import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import ChatHistory from './ChatHistory/ChatHistory';
import SendMessage from './SendMessage/SendMessage';
import Divider from 'material-ui/Divider';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    console.log("Chat Messages: " + JSON.stringify(this.props.messages));
  }

  render() {
    const styles = {
      height: 500,
      width: 500,
      textAlign: 'center',
      margin: '20px auto',
      position: 'relative'
    };

    return (
      <Paper style={styles} zDepth={2}>
        <ChatHistory messages={this.props.messages}
                     thisUser={this.props.thisUser}/>
        <Divider/>
        <SendMessage thisUser={this.props.thisUser}/>
      </Paper>
    );
  }

}

export default Chat;
