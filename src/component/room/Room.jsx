import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from './UserList/UserList';
import Chat from './Chat/Chat';
import Singleton from '../../socket';
import MessageType from './Chat/SendMessage/MessageType';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import {
  userJoined,
  userJoinedAck,
  userLeft,
  messageReceived,
} from '../../redux/actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// import _ from 'lodash';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      usernameInput: '',
      room: {
        capacity: 2,
      },
    }
  }

  registerSocket() {
    let self = this;
    this.socket = Singleton.getInstance();

    this.socket.onmessage = (response) => {
      console.log("Socket Connection Opened");
      let message = JSON.parse(response.data);
      let users;

      switch (message.type) {
        case MessageType.TEXT_MESSAGE:
          self.props.messageReceived(message);
          break;
        case MessageType.USER_JOINED:
          users = JSON.parse(message.data);
          self.props.userJoined(users);
          break;
        case MessageType.USER_LEFT:
          users = JSON.parse(message.data);
          self.props.userLeft(users);
          break;
        case MessageType.USER_JOINED_ACK:
          let thisUser = message.user;
          self.props.userJoinedAck(thisUser);
          break;
        default:
      }
    };

    this.socket.onopen = () => {
      console.log("Socket Connection Opened");
      this.sendJoinedMessage();
    };

    window.onbeforeunload = () => {
      let messageDto = JSON.stringify({ user: this.props.thisUser, type: MessageType.USER_LEFT });
      this.socket.send(messageDto);
    }
  }

  sendJoinedMessage() {
    let messageDto = JSON.stringify({ user: this.state.usernameInput, type: MessageType.USER_JOINED });
    this.socket.send(messageDto);
  }

  onChooseName() {
    this.registerSocket();
    this.setState({ modalOpen: false });
  }

  updateInputValue(value) {
    this.setState({ usernameInput: value });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onChooseName();
    }
  };

  render() {
    const modalActions = [
      <RaisedButton
        label="Choose"
        primary={true}
        onClick={() => this.onChooseName()}
      />
    ];

    const modalStyle = {
      width: '600px'
    };

    const chat = this.state.modalOpen ? ''
      :
      <Chat messages={this.props.messages}
            thisUser={this.state.usernameInput}/>;

    return(
      <MuiThemeProvider>
        <div className="App">
          <UserList users={this.state.users} />
          {chat}
          <Dialog
            title="Preferred nick name..."
            actions={modalActions}
            modal={true}
            open={this.state.modalOpen}
            contentStyle={modalStyle}>
            <TextField
              autoFocus
              hintText="nick name..."
              value={this.state.usernameInput}
              onChange={(event) => this.updateInputValue(event.target.value)}
              onKeyPress={this.handleKeyPress}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

Room.PropTypes = {
  isIdle: PropTypes.bool.isRequired,
  timeRemaining: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  console.log("Room State: " + JSON.stringify(state));
  return {
    messages: state.messages,
    users: state.users,
    thisUser: state.thisUser
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    userJoined: userJoined,
    userJoinedAck: userJoinedAck,
    userLeft: userLeft,
    messageReceived: messageReceived,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
