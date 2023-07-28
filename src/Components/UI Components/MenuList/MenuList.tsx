import React, {FC, ReactElement} from 'react';
import cl from './menuList.module.css';
import {MenuItemProps} from "../MenuItem/MenuItem";

interface MenuListProps {
    children: ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[];
}

const MenuList: FC<MenuListProps> = ({children}) => {
    return (
        <ul className={cl.menuList}>
            {children}
        </ul>
    );
};

export default MenuList;