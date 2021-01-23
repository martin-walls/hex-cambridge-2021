import React from 'react';
import './CatCard.css';
import CatPicNoBorder from './CatPicNoBorder';


const CatCard = ({user}) => {
    return(
    <div className="cat-card-wrapper">
        <CatPicNoBorder onClick={()=>{}} width="auto" height="100%" imgUrl={user.imgUrl}/>
        <h3 id="title">This is a cat card for {user.username}</h3>
        <p>Some info on this cat</p>
    </div>
    )
}

export default CatCard;