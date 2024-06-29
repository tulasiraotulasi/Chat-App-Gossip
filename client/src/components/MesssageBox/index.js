const MessageBox = (props) => {
  const { message, sender } = props;
  if (message === "join") {
    return (
      <div className="centerMessage">
        <p>{sender.toUpperCase()} joined the chat</p>
      </div>
    );
  } else if (sender === "Server") {
    return (
      <div>
        <div className="server">
          <p>{message} Users in the Chat </p>
        </div>
      </div>
    );
  } else if (message === "leftTheChat") {
    return (
      <div>
        <div className="disconnected">
          <p>{sender} left the chat</p>
        </div>
      </div>
    );
  } else if (sender === "you") {
    return (
      <div className="rightMessage">
        <p>{message}</p>
        {/* <hr /> */}
      </div>
    );
  } else {
    return (
      <div className="leftMessage">
        <h4 className="userTag">{sender}</h4>
        <p>{message}</p>
        {/* <hr /> */}
      </div>
    );
  }
};

export default MessageBox;
