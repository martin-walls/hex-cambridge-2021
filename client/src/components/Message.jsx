import React from 'react';

import './Message.css';


const Message = ({message}) => {

    return (
        <li className="message" style={message.ownedByCurrentUser?{justifyContent:"flex-end"}:{justifyContent:"flex-start"}}>
            <div className="message-body" style={message.ownedByCurrentUser?{backgroundColor:"white"}:{backgroundColor:"lightblue"}}>
                {message.body}
            </div>
        </li>
    );
}

export default Message;