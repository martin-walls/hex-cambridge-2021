import React from 'react';
import './CatPicChoice.css';

const CatPicChoice = ({imgUrl, onClick, size}) => {
    return (
        <div className="cat-pic" style={{width:size, height:size}} onClick={(e) => onClick()}>
            <img src={imgUrl} alt="a cat pic"/>
        </div>
    )
}

export default CatPicChoice;