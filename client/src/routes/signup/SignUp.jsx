import React, {useState} from "react";

import './Signup.css';

const SignUp = ({location}) => {
    const [username, setUsername] = useState(new URLSearchParams(location.search).get('username'));
    const [catPics, setCatPics] = useState([]);
    
    

    return <div>{username}</div>
}

export default SignUp;