import React, {FC, ReactElement} from 'react';
import cl from './header.module.css'

interface HeaderProps {
    title: string;
    children?: ReactElement;
}

const Header: FC<HeaderProps> = ({title, children}) => {
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