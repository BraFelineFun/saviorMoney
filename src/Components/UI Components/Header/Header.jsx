import React from 'react';
import cl from './header.module.css'

const Header = ({title, children}) => {
    return (

        <div className={[cl.headWrapper, "wrapperPadding"].join(" ")}>
            <div>
                <h2>{title}</h2>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Header;