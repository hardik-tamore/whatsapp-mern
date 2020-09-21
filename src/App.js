import React, { useEffect, useState } from "react";
import "./App.css";
import Chats from "./Chats";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 480) {
      setisMobile(true);
    }
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Route path="/" exact>
              <Sidebar />
            </Route>
            <Switch>
              <Route path="/rooms/:roomId">
                {!isMobile && <Sidebar />}
                <Chats />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
