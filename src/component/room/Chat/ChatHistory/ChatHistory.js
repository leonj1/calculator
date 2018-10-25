import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ChatHistory extends Component {

    render() {
        const style = {
            backgroundColor: '#eaeaea',
            padding: 15,
            height: '420px',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column'
        };

        console.log("ChatHistory Messages: " + JSON.stringify(this.props.messages));

        const msgs = this.props.messages.map((message, i) =>
            this.renderMessages(message, i)
        );

        return (
            <div style={style}>
                {msgs}
            </div>
        )
    }

  /**
   * @param message
   * {
   *    "user": {
   *        "name": "foo",
   *    },
   *    "data": "bar"
   * }
   */
    renderMessages(message, i) {
        const style = {
            display: 'block',
            margin: '5px 0'
        };

        const isMe = this.props.thisUser === message.user.name;
        const floatDirection = isMe ? 'right' : 'left';
        const nameColor = isMe ? 'green' : 'red';
        const margin = isMe ? ' 0 0 0 40px' : '0 40px 0 0 ';

        const textStyle = {
            float: floatDirection,
            backgroundColor: '#fff',
            padding: '6px 10px',
            borderRadius: '15px',
            margin: margin,
            textAlign: 'left'
        };

        const nameStyle = {
            color: nameColor,
            float: floatDirection
        };

        return (
            <div key={i} style={style}>
                <span style={textStyle}>
                    <span style={nameStyle}>{message.user.name}</span>
                    <br />
                    {message.data}
                </span>
            </div>
        );
    }
}

ChatHistory.PropTypes = {
    thisUser: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
};
//
// // Whatever is returned is going to show up as props inside UserList
// function mapStateToProps(state) {
//     return {
//         messages: state.messages,
//     }
// }
//
// // Promote component to container
// export default connect(mapStateToProps)(ChatHistory);

export default ChatHistory;
