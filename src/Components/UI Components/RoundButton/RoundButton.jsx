import React from 'react';
import cl from './RoundButton.module.css'
const RoundButton = ({callback}) => {
    return (
        <div onClick={() => callback()} className={cl.round}>
            <span className={cl.plus}></span>
        </div>
    );
};

export default RoundButton;