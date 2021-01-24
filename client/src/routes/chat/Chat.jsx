import React, { useCallback, useEffect, useState } from 'react';
import './Chat.css';
import ChatRoom from './ChatRoom';
import axios from 'axios';


const getRoomId = async (currentUser, targetUser) => {
    return axios("http://PLACEHOLDER/getchatroom", 
    {
        method:"GET",
        data: {
            currentUsername: currentUser,
            targetUsername: targetUser
        }
    }).then(res => res.data);
};

const getAllMatched = async (currentUser) => {
    return axios("http://PLACEHOLDER/matches", 
    {
        method: "GET",
        params: {
            currentuser: currentUser
        }
    }).then(res => res.data);
}

const Chat = ({user}) => {
    const [roomId, setRoomId] = useState();
    const [matched, setMatched] = useState([]);

    useEffect(() => {
        getAllMatched(user.username).then(data => {
            if (data.success && data.matched.length>0) {
                setMatched(data.matched);
            } else {
                setMatched([]);
            }
        }).catch(e => {
            // TODO: it's a place holder here
            setMatched(["userA", "userB", "userC"]);
        });
    }, [user]);

    const handleChatChoice = useCallback(async (e)=>{
        const res = getRoomId(user.username, e.target.value);
        setRoomId(res.roomId);
    }, [user]);

    return (
        <>
        <div>This is the chat room</div>
        <div id="chat">
            <div id="chat-side-bar">
                <div id="chat-item-list">
                    {matched.map((el, i) => {
                        return <button className="chat-item" key={i} onClick={handleChatChoice} value={el}>{el}</button>
                    })}
                </div>
            </div>
            {/* {roomId && 
                <ChatRoom roomId={roomId}  user={user}/>
            } */}
            <ChatRoom roomId={1}  user={user}/>
        </div>
        </>
    );
}

export default Chat;