import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import Cookies from "js-cookie";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import PublicIcon from "@mui/icons-material/Public";
import Messagebox from "../MesssageBox";
import "./index.css";

const arr = [
  { sender: "Asha", message: "hai guys" },
  { sender: "Karan", message: "hai hi" },
  { sender: "Girija", message: "hai all" },
  { sender: "you", message: "hi" },
];

// const socket = io.connect("https://chat-app-gossip.vercel.app/");
// const socket = io.connect(
//   "https://chat-app-gossip-server2.vercel.app" || "http://localhost:3001"
// );
const socket = io.connect("https://chat-app-gossip-server2.vercel.app", {
  transports: ["websocket", "polling"],
});

const PublicChat = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("username") === undefined) {
      navigate("/");
    }
    setUsername(Cookies.get("username"));
    // setChatMessages([...arr]);

    socket.emit("userJoining", {
      sender: Cookies.get("username"),
      message: "join",
    });
  }, [navigate]);

  useEffect(() => {
    socket.on("joined", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    socket.on("receiveMessage", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    socket.on("userLeft", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    socket.on("onlineUsers", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messages === "") {
      return;
    }
    let obj = {
      sender: "you",
      message: messages,
    };
    if (obj.message === "users online") {
      socket.emit("checkUsers");
      setMessages("");
      return;
    }
    setChatMessages((prev) => [...prev, obj]);
    console.log(obj);
    setMessages("");
    socket.emit("sendMessage", { ...obj, sender: username });
  };

  const userInput = (event) => {
    setMessages(event.target.value);
  };

  return (
    <div className="public-container">
      <h1 className="heading">
        <SatelliteAltIcon color="info" fontSize="large" />
        ...Public Chat...
        <PublicIcon color="success" fontSize="large" />
      </h1>
      <div className="messaageContainer">
        {chatMessages.map((item) => (
          <Messagebox
            key={uuidv4()}
            sender={item.sender}
            message={item.message}
          />
        ))}
      </div>
      <form className="form" onSubmit={sendMessage}>
        <input
          className="inputMessage"
          type="text"
          onChange={userInput}
          value={messages}
          placeholder="Enter Your Message Here...."
        />
        <button className="btn" type="submit">
          send
        </button>
      </form>
    </div>
  );
};

export default PublicChat;
