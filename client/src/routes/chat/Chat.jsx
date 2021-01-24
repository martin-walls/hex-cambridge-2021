import React, { useCallback, useEffect, useState } from "react";
import "./Chat.css";
import ChatRoom from "./ChatRoom";
import axios from "axios";

const getRoomId = async (currentUser, targetUser) => {
  console.log("getting chat room with ", targetUser);
  return axios("/api/getchatroom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      currentUsername: currentUser,
      targetUsername: targetUser
    }
  }).then((res) => res.data);
};

const getAllMatched = async (currentUser) => {
  console.log("getting all matches");
  return axios("/api/matches", {
    method: "GET",
    params: {
      currentuser: currentUser
    }
  }).then((res) => res.data);
};

const Chat = ({ user }) => {
  const [roomId, setRoomId] = useState();
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    getAllMatched(user.username)
      .then((data) => {
        if (data.success && data.matches.length > 0) {
          setMatched(data.matches);
        } else {
          setMatched([]);
        }
      })
      .catch((e) => {
        // TODO: it's a place holder here
        //setMatched(["userA", "userB", "userC"]);
        console.log(e);
      });
  }, [user]);

  const handleChatChoice = useCallback(
    async (e) => {
      console.log(e.target.value);
      const res = await getRoomId(user.username, e.target.value);
      console.log(JSON.stringify(res));
      if (res.online) {
        console.log(res.roomId);
        setRoomId(res.roomId);
      } else {
          alert("the user is not online");
      }
    },
    [user]
  );

  return (
    <>
      <div id="chat">
        <div id="chat-side-bar">
          <div id="chat-item-list">
            {matched.map((el, i) => {
              return (
                <button className="chat-item" key={i} onClick={handleChatChoice} value={el}>
                  {el}
                </button>
              );
            })}
          </div>
        </div>
        {roomId && <ChatRoom roomId={roomId} user={user} />}
        {/* <ChatRoom roomId={1}  user={user}/> */}
      </div>
    </>
  );
};

export default Chat;
