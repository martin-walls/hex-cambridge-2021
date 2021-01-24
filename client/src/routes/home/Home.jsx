import React, { useState, useEffect, useCallback } from "react";
import { navigate } from "@reach/router";
import "./Home.css";
import CatPicChoice from "../../components/CatPicChoice";
import axios from "axios";
import CatCard from "../../components/CatCard";
import TopBar from "../../components/TopBar";

const LEFT = "left";
const RIGHT = "right";

const getNextUser = async (currentUser) => {
  return axios(`/api/nextuser?currentuser=${currentUser}`, {
    method: "GET"
  }).then((res) => {
    return res.data;
  });
};

const swipe = async (currentUser, onUser, direction) => {
  return axios("/api/swipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      currentuser: currentUser,
      onuser: onUser,
      direction: direction
    }
  }).then((res) => res.data);
};

const Home = ({ user }) => {
  // TODO: this is just a place holder user object
  const [
    currentChoice,
    setCurrentChoice
  ] = useState(/*{username:"catA", imgUrl: "https://www.humanesociety.org/sites/default/files/styles/2000x850/public/2018/08/kitten-440379.jpg"}*/);

  useEffect(() => {
    getNextUser(user.username).then((res) => setCurrentChoice(res.user));
  }, [user]);

  const handleClick = useCallback(
    async (direction) => {
      console.log("swipped: ", direction);
      const resSwipe = await swipe(user.username, currentChoice.username, direction);
      console.log(JSON.stringify(resSwipe));
      console.log("getting next one: ");
      const newChoice = await getNextUser(user.username);
      setCurrentChoice(newChoice.user);
    },
    [user, currentChoice]
  );

  return (
    <div id="home">
      <h1>Home: Welcome back, {user.username}</h1>
      <div id="main-body">
        <button id="swipe-left" className="swipe" onClick={() => handleClick(LEFT)}>
          SWIPE LEFT
        </button>
        {currentChoice && <CatCard user={currentChoice} />}
        <button id="swipe-right" className="swipe" onClick={() => handleClick(RIGHT)}>
          SWIPE RIGHT
        </button>
      </div>
    </div>
  );
};

export default Home;
