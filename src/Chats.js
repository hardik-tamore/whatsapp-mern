import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./chats.css";
import MicIcon from "@material-ui/icons/Mic";
import { Link, useParams } from "react-router-dom";
import db from "./firebase";
import userEvent from "@testing-library/user-event";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";

function Chats() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        setRoomName(snapshot.data().name);
      });
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input !== "") {
      db.collection("rooms").doc(roomId).collection("messages").add({
        name: user.displayName,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Link to="/">
          <ArrowBackIcon />
        </Link>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        {/* <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div> */}
      </div>
      <div className="chat__body">
        {messages.map((message) => {
          return (
            <p
              className={`chat__message ${
                message.name === user.displayName && "chat__receiver"
              } `}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            value={input}
          />
          <button
            className="chat__footerButton"
            onClick={sendMessage}
            type="submit"
          >
            <SendIcon />
          </button>
        </form>
        {/* <MicIcon /> */}
      </div>
    </div>
  );
}

export default Chats;
