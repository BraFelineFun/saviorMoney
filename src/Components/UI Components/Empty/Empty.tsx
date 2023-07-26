import React, {FC} from 'react';
import cl from './empty.module.css'
const emptyImg = require('./../../../Resources/img/empty.png');

interface EmptyProps {
    emptyText: string;
}

const Empty: FC<EmptyProps> = ({emptyText}) => {
    return (
        <div className={cl.emptyBody}>
            <img src={emptyImg} alt="empty"/>
            <h3>{emptyText}</h3>
        </div>
    );
};

export default Empty;