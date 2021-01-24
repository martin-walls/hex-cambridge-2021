import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { navigate } from "@reach/router";

async function loginUser(username) {
  return axios(`/api/user/${username}`, {
    method: "GET"
  }).then((res) => {
    console.log(JSON.stringify(res.data));
    return res.data;
  });
}

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== "") {
      const res = await loginUser(username);
      //const res = {user: {username: username, imgUrl:"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"}, success: true};
      //const res = {success: false}
      console.log(JSON.stringify(res.user));
      if (res.success) {
        setUser(res.user);
      } else {
        await navigate(`/signup?username=${username}`);
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Please enter your name</p>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
