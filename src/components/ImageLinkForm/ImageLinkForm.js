import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
<div>
    <p className='f4 white'>This Magic Brain will detect faces in your pictures. Give it a try.</p>
<div>
    <div className='pa4 br3 w-90 shadow-5 center'>
    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}></input>
    <button className='w-20 truncate grow f4 link ph3 pv2 dib white bg-light-blue'
    onClick={onButtonSubmit}>Detect</button>
</div>
</div>
</div>
    );
}

export default ImageLinkForm;