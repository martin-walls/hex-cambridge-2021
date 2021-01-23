import React from 'react';
import './CatPicNoBorder.css';

const CatPicNoBorder = ({imgUrl, onClick, width, height}) => {
    return (
        <div className="cat-pic-no-border" style={{width:width, height:height}} onClick={(e) => onClick()}>
            <img src={imgUrl} alt="a cat pic"/>
        </div>
    )
}

export default CatPicNoBorder;