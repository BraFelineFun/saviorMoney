import React, {FC} from 'react';
import cl from './menuItem.module.css';

export interface MenuItemProps {
    onClick: () => void;
    children: string;
    image?: string;
    alt?: string;
}

const MenuItem: FC<MenuItemProps> = ({onClick, image, children, alt}) => {

    function handleClick(e: React.MouseEvent<HTMLLIElement>) {
        e.stopPropagation();
        onClick();
    }

    return (
        <li
            onClick={handleClick}
            className={cl.menuItem}
        >
            <div className={cl.menuItem_icon}>
                {!image?
                    <div className={cl.defaultImg}></div>
                    :
                    <img src={image} alt={alt}/>
                }
            </div>
            <div>
                {children}
            </div>
        </li>
    );
};

export default MenuItem;