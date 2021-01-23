import React from 'react';
import './CatPicChoice.css';

const CatPicChoice = ({imgUrl, onClick}) => {
    return (
        <div className="cat-pic" onClick={(e) => onClick()}>
            <img src={imgUrl} alt="a cat pic"/>
        </div>
    )
}

export default CatPicChoice;