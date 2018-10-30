import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from './UserList/UserList';
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
import { USER_CONNECTED, LOGOUT } from '../../Events'
import ChatContainer from './Chat/ChatContainer';

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

  /*
  *	Sets the user property in state to null.
  */
  logout = () => {
    this.props.socket.emit(LOGOUT);
  };

  onChooseName() {
    this.setState({ modalOpen: false });
  }

  updateInputValue(value) {
    this.props.socket.emit(USER_CONNECTED, value);
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
      <ChatContainer socket={this.props.socket}
                     user={this.state.usernameInput}
                     logout={this.logout}/>;

    return(
      <MuiThemeProvider>
        <div className="container">
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
