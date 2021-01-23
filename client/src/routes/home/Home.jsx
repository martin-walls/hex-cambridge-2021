import React, { useState } from 'react';
import { navigate } from '@reach/router';
import './Home.css';

const Home = ({user, logout}) => {
    const handleLogout = (e) => {
        logout()
    }
    return (
        <>
            <div>Home: {user.username}</div>
            <img src={user.imgUrl} alt="a cat" />
            <div>
                <div>Logout?</div>
                <button onClick = {handleLogout}>Logout</button>
            </div>
        </>
    )
}

export default Home;
