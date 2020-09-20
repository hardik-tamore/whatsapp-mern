import React from "react";
import "./App.css";
import Chats from "./Chats";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chats />
      </div>
    </div>
  );
}

export default App;
