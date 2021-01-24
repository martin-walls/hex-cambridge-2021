import React from 'react';
import { Link } from '@reach/router';
import CatPicChoice from './CatPicChoice';
import './TopBar.css';

const TopBar = ({user, logout}) => {
    return (
        <div id="top-bar">
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/chat" className="nav-link">Chat</Link>
            </nav>
            <div id="head-and-logout">
                <button onClick = {logout}>Logout</button>
                <CatPicChoice imgUrl={user.imgUrl} size="100px" onClick={()=>{}}/>
            </div>
        </div>
    )
}

export default TopBar;