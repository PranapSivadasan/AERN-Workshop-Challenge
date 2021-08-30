import React from 'react';
import '../css/header-footer.css';

const HeaderComponent = () => {
    return (
        <div className='header'>
            <img src='/night-owl.svg' alt='Night Owl' width='35px'></img>
            <span className='heading'>Night Owl</span>
        </div>
    );
}

export default HeaderComponent;