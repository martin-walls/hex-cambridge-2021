import React, { useState, useEffect, useCallback } from "react";
import { useBeforeunload } from "react-beforeunload";
import { Router } from "@reach/router";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import SignUp from "./routes/signup/SignUp";
import Chat from "./routes/chat/Chat";
import TopBar from "./components/TopBar";

const App = () => {
  const [user, setUser] = useState({});

  // on startup
  useEffect(() => {
    setUser({
      username: localStorage.getItem("username") || "",
      imgUrl: localStorage.getItem("imgUrl") || ""
    });
  }, []);

  // On change
  useEffect(() => {
    for (let key in user) {
      localStorage.setItem(key, user[key]);
    }
    return () => {
      for (let key in user) {
        localStorage.removeItem(key);
      }
    };
  }, [user]);

  // On Logout
  const logOut = useCallback(
    async () => {
      for (let key in user) {
        localStorage.setItem(key, "");
      }
      // TODO: send request to the server saying that "username" wants to LOGOUT
      const res = await axios("/api/logout", {
        method: "GET",
        params: {
          currentuser:user 
        }
      });
      setUser({});
    },
    [user],
  )

  if (!user.username || user.username === "") {
    return (
      <Router>
        <Login path="/" setUser={setUser} />
        <SignUp path="/signup" />
      </Router>
    );
  }
  return (
    <>
      <TopBar user={user} logout={logOut} />
      <div id="body">
        <Router>
          <Home path="/" user={user} />
          <Chat path="/chat" user={user} />
        </Router>
      </div>
    </>
  );
};

export default App;
