import React from 'react';
import emptyImg from './../../../Resources/img/empty.png'
import cl from './empty.module.css'
const Empty = ({emptyText}) => {
    return (
        <div className={cl.emptyBody}>
            <img src={emptyImg} alt="empty"/>
            <h3>{emptyText}</h3>
        </div>
    );
};

export default Empty;