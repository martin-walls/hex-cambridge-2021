import React, {useState} from "react";
import axios from 'axios';

import CatPicChoice from "./CatPicChoice";
import './Signup.css';
import { navigate } from "@reach/router";

const signUp = async (username, imgUrl) => {
    return axios(`http://PLACEHOLDER/user/${username}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            imgUrl: imgUrl
        }
    })
    .then(res => res.data);
}

const SignUp = ({location}) => {
    const [username, setUsername] = useState(new URLSearchParams(location.search).get('username'));
    const [catPics, setCatPics] = useState([
        "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
        "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
        "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
    ]);
    
    const handleChoice = async (imgUrl) => {
        //const res = await signUp(username, imgUrl);
        console.log(`registered: ${JSON.stringify({username, imgUrl})}`)
        await navigate("/");
    }

    return (
    <>
        <div>{username}</div>
        <h3>Please choose your cat</h3>
        <div className="cat-pics-choice-wrapper">
            {catPics.map((url, index) => <CatPicChoice key={index} imgUrl={url} onClick={() => handleChoice(url)}/>)}
        </div>
    </>
    );
}

export default SignUp;