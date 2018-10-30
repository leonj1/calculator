import React, {Component} from 'react';
import FASignOut from 'react-icons/lib/fa/sign-out';

class ChatHeading extends Component {

  render() {
    let { name, numberOfUsers, logout } = this.props;
    return (
      <div className="chat-header">
        <div className="user-info">
          <div className="user-name">{name}</div>
          <div className="status">
            <div className="indicator"></div>
            <span>{numberOfUsers ? numberOfUsers : null}</span>
          </div>
        </div>
        <div className="options" onClick={logout}>
          <FASignOut size={20}/>
        </div>
      </div>
    );
  }
}

export default ChatHeading;
