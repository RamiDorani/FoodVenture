import React, { Component } from 'react';
import { connect } from 'react-redux'
import socketService from '../services/socketService';

class _Chat extends Component {

  state = {
    msg: { from: this.props.user.userName, txt: '', isChef: this.props.user.chef },
    msgs: [],
    userTyping: '',
    firstMsgSent: false
  };

  elInput = React.createRef()

  timeout

  componentDidMount() {
    socketService.setup();
    socketService.emit('chat topic', this.props.user_id);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('user typing', this.addUserTyping);
    socketService.on('reset', this.resetUserTyping);
    socketService.emit('get msgs');
    socketService.on('send msgs', msgs => {
      this.setState({ msgs })
    });
    this.addMsg(this.state.msgs)
    this.elInput.current.focus()
  }

  componentWillUnmount() {
    socketService.off('chat addMsg', this.addMsg);
    socketService.terminate();
    this.setState({ userTyping: '' })
  }

  addMsg = newMsg => {
    this.setState({ msgs: newMsg });
    console.log(this.props);
  };

  changeTopic = () => {
    socketService.emit('chat topic', this.props.user._id);
  };

  sendMsg = ev => {
    ev.preventDefault();
    socketService.emit('chat newMsg', this.state.msg);
    this.setState({ msg: { from: this.props.user.userName, txt: '' } });
  };

  msgHandleChange = ev => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => socketService.emit('reset typing', ''), 500);
    socketService.emit('typing', this.props.user.userName)
    const { name, value } = ev.target;
    this.setState(prevState => {
      return {
        msg: { ...prevState.msg, [name]: value }
      };
    });
  };

  addUserTyping = user => {
    this.setState({ userTyping: user })
  }

  resetUserTyping = reset => {
    this.setState({ userTyping: reset })
  }

  render() {

    const { chef } = this.props

    return (
      <div className="chat">

        <div className="chat-container">

          <div className="chat-header">
            <h3>{this.props.user.chef ? 'Welcome' : 'Contact'} {chef}</h3>
          </div>

          <div className="msgs">
            {/* <ul> */}
              {this.state.msgs.map((msg, idx) => (
                <p key={idx} className={msg.isChef ? 'chef' : 'user'}><span>{msg.from}</span> : {msg.txt}</p>
              ))}
            {/* </ul> */}
          </div>

          <div className="chat-footer">
            <form onSubmit={this.sendMsg}>
              <input type="text" value={this.state.msg.txt} onChange={this.msgHandleChange} name="txt" autoComplete="off" ref={this.elInput} />
              <button>Send</button>
              {this.state.userTyping && <p className="typing">{this.state.userTyping} is typing</p>}
            </form>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.loggedInUser
  }
}

export const Chat = connect(mapStateToProps)(_Chat)