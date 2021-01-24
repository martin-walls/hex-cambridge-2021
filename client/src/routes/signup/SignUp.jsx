import React, { useState, useEffect } from "react";
import axios from "axios";

import CatPicChoice from "../../components/CatPicChoice";
import "./Signup.css";
import { navigate } from "@reach/router";

const signUp = async (username, imgUrl) => {
  return axios(`/api/user/${username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      imgUrl: imgUrl
    }
  }).then((res) => res.data);
};

const getCatPics = async (count) => {
  return axios(`/api/images?count=${count}`, {
    method: "GET"
  }).then((res) => res.data);
};

const SignUp = ({ location }) => {
  const username = new URLSearchParams(location.search).get("username");

  const [catPics, setCatPics] = useState([
    /*"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"*/
  ]);

  useEffect(() => {
    getCatPics(10)
      .then((res) => res.images)
      .then((images) => setCatPics(images));
  }, []);

  const handleChoice = async (imgUrl) => {
    const res = await signUp(username, imgUrl);
    console.log(`registered: ${JSON.stringify({ username, imgUrl })}`);
    await navigate("/");
  };

  return (
    <>
      <div>{username}</div>
      <h3>Please choose your cat</h3>
      <div className="cat-pics-choice-wrapper">
        {catPics.map((url, index) => (
          <CatPicChoice key={index} imgUrl={url} onClick={() => handleChoice(url)} size="300px" />
        ))}
      </div>
    </>
  );
};

export default SignUp;
