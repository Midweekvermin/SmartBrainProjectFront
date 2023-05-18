import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
           <Tilt>
        <img src={brain} alt='logo'style= {{width:150, height:150}}></img>
    </Tilt>
        </div>
    );
}

export default Logo;