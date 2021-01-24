import React, {useState} from 'react';
import './ChatRoom.css';
import Message from '../../components/Message';
import useChat from './utils/useChat';
// import { MessageBox } from 'react-chat-elements';

const CHAT_CHOICES = [
    "meowwwwwwwww`(*>﹏<*)′", "meow\^o^/\^o^/"
]

const ChatRoom = ({user, roomId}) => {
    const {messages, sendMessage} = useChat(roomId);
  
    const handleSendMessage = (message) => {
        console.log(message);
        sendMessage(message);
    };

    return (
        <div id="chat-room">
            <div className="chat-box">
                <ul id="message-list">
                    {/* <Message message={{messageBody:"some text", ownedByCurrentUser:true}} />
                    <Message message={{messageBody:"some text", ownedByCurrentUser:false}} /> */}
                    {
                        messages.map((m, i) => {
                            return <Message key={i} message={m}/>
                        })
                    }
                </ul>
            </div>
            <div className="chat-choices">
                {CHAT_CHOICES.map((choice, i) => {
                    return <button key={i} onClick={()=>{handleSendMessage(choice)}}>{choice}</button>
                })}
            </div>
        </div>
    )
};

export default ChatRoom;