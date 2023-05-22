import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl}) => {
    return (
<div className="center ma mt3" >
 <img alt='' id='inputimage' src={imageUrl} height={500} width={500}/>
</div>
    );
}

export default FaceRecognition;