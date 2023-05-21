import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl}) => {
    return (
<div >
 <img alt='' src={imageUrl} height={500} width={500}/>
</div>
    );
}

export default FaceRecognition;