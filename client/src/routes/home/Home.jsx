import React, { useState, useEffect, useCallback } from 'react';
import { navigate } from '@reach/router';
import './Home.css';
import CatPicChoice from '../../components/CatPicChoice';
import axios from 'axios';
import CatCard from '../../components/CatCard';


const LEFT = "left";
const RIGHT = "right";

const getNextUser = async (currentUser) => {
    return axios(`http://PLACEHOLDER/nextuser?currentuser=${currentUser}`, 
    {
        method: 'GET'
    }).then(res => res.data);
}

const swipe = async(currentUser, onUser, direction) => {
    return axios("http://PLACEHOLDER/swipe", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            currentuser: currentUser,
            onuser: onUser,
            direction: direction
        }
    }).then(res => res.data);
};

const Home = ({user, logout}) => {
    // TODO: this is just a place holder user object
    const [currentChoice, setCurrentChoice] = useState({username:"catA", imgUrl: "https://www.humanesociety.org/sites/default/files/styles/2000x850/public/2018/08/kitten-440379.jpg"});

    useEffect(() => {
        getNextUser(user.username).then(res => setCurrentChoice(res));
    }, [user])

    const handleClick = useCallback(
        async (direction) => {
            console.log("swipped: ", direction);
            const resSwipe = await swipe(user.username, currentChoice, direction);
            console.log(JSON.stringify(resSwipe));
            console.log("getting next one: ")
            const newChoice = await getNextUser(user.username);
            setCurrentChoice(newChoice);
        },
        [user, currentChoice],
    )

    return (
        <>
            <div id="top-bar">
                <button onClick = {logout}>Logout</button>
                <CatPicChoice imgUrl={user.imgUrl} size="100px" onClick={()=>{}}/>
            </div>
            <div id="body">
                <h1>Home: Welcome back, {user.username}</h1>
                <div id="main-body">
                    <button id="swipe-left" className="swipe" onClick={()=>handleClick(LEFT)}>SWIPE LEFT</button>
                    <CatCard user={currentChoice}/>
                    <button id="swipe-right" className="swipe" onClick={()=>handleClick(RIGHT)}>SWIPE RIGHT</button>
                </div>
            </div>
        </>
    )
}

export default Home;
