import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import {
  sendMessageRequest,
  loginRequest,
  userLoggedOut,
  fetchLatestMessages,
} from '../../redux/actions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import ChatContainer from './Chat/ChatContainer';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      nickName: '',
      room: {
        capacity: 2,
      },
    }
  }

  /*
  *	Sets the user property in state to null.
  */
  logout = () => {
    this.props.userLoggedOut();
  };

  onChooseName() {
    this.props.loginRequest(this.state.nickName);
  }

  typingNickName(value) {
    this.setState({ nickName: value });
  }

  handleUserLogin = (event) => {
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

    const chat = this.props.userLoggedIn ?
      <ChatContainer user={this.state.nickName}
                     sendMessage={this.props.sendMessageRequest}
                     refersh={this.props.fetchLatestMessages}
                     logout={this.logout}/>
      : '';

    return(
      <MuiThemeProvider>
        <div className="container">
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
              value={this.state.nickName}
              onChange={(event) => this.typingNickName(event.target.value)}
              onKeyPress={this.handleUserLogin}
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
  return {
    messages: state.messages,
    users: state.users,
    thisUser: state.thisUser,
    userLoggedIn: state.userLoggedIn,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    loginRequest: loginRequest,
    userLoggedOut: userLoggedOut,
    sendMessageRequest: sendMessageRequest,
    fetchLatestMessages: fetchLatestMessages,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
