import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Home = () => {
  const [name, setName] = useState("");
  const [roomNumber, setRoomNumber] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("username");
    Cookies.remove("userRoom");
  }, []);

  const joinPublic = () => {
    if (name === "") {
      return;
    }
    Cookies.set("username", name);
    navigate("/public");
  };
  const joinPrivate = () => {
    return;
    // if (name === "" || roomNumber === "") {
    //   return;
    // }
    // Cookies.set("username", name);
    // Cookies.set("userRoom", roomNumber);
    // navigate(`/private/${roomNumber}`);
  };
  return (
    <div className="container">
      <div className="left">
        <h1>Public Chat</h1>
        <label htmlFor="namePublic">Name</label>
        <input
          id="namePublic"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <p>Join Global Chat</p>
        <button className="btn" onClick={joinPublic}>
          Join
        </button>
      </div>

      {/* <div className="right">
        <h1>Private Chat in Devlopment</h1>
        <p>use public chat only</p>
        <label htmlFor="namePrivate">Name</label>
        <input
          id="namePrivate"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <br />
        <label htmlFor="roomNumber">Room Number</label>
        <input
          id="roomNumber"
          type="text"
          onChange={(event) => {
            setRoomNumber(event.target.value);
          }}
        />
        <br />
        <button className="btn" onClick={joinPrivate}>
          Join
        </button>
      </div> */}
    </div>
  );
};

export default Home;
