import React from 'react';


const Navigation = ({onRouteChange}) => {
    return (
        
        <nav>
            <p onClick={() => onRouteChange('signin')} className ='f3 link dim white underline w-0 fr mr3 pointer'>Sign out</p>
        </nav>
    );
}

export default Navigation;