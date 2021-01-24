import React from 'react';
import { Link } from '@reach/router';
import CatPicChoice from './CatPicChoice';
import './TopBar.css';

const TopBar = ({user, logout}) => {
    return (
        <div id="top-bar">
            <button onClick = {logout}>Logout</button>
            <CatPicChoice imgUrl={user.imgUrl} size="100px" onClick={()=>{}}/>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/chat">Chat</Link>
            </nav>
        </div>
    )
}

export default TopBar;