import React, {FC,  useEffect, useRef, useState} from 'react';
import cl from "./moreButton.module.css"
import assertIsNode from '../../../Helpers/assertEventTargetToNode';

const editImg = require("../../../Resources/img/edit.png");
const deleteImg = require("../../../Resources/img/delete.png");

interface MoreButtonProps {
    removeCallback: () => void;
    editCallback: () => void;
}

const MoreButton: FC<MoreButtonProps> = ({removeCallback, editCallback}) => {
    //TODO: Redisign so it can accept <MenuItems> with callbacks in parent's component

    const [isMenu, setIsMenu] = useState(false);
    const menuButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close menu if click event happened, but in callbacks this behavior is prevented

        const closeMenu = (e: MouseEvent): void => {
            assertIsNode(e.target);
            if (!menuButtonRef?.current?.contains(e.target)) {
                setIsMenu(false);
            }
        }
        document.addEventListener('click', closeMenu)
        return () => {
            document.removeEventListener('click', closeMenu)
        }
    }, [menuButtonRef])

    function toggleMenu(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        assertIsNode(e.target);
        setIsMenu(!isMenu);
    }

    function remove(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        removeCallback()
    }

    function edit(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        editCallback();
    }


    return (
        <button className={cl.moreButton}>
            <div onClick={toggleMenu}
                 className={cl.circleGroup}
                 ref={menuButtonRef}
            >
                <span className={isMenu ? [cl.circle, cl.activeMenuCircle].join(" ") : cl.circle}></span>
                <span className={isMenu ? [cl.circle, cl.activeMenuCircle].join(" ") : cl.circle}></span>
                <span className={isMenu ? [cl.circle, cl.activeMenuCircle].join(" ") : cl.circle}></span>
            </div>
            <div className={isMenu ? [cl.dropDownMenu, cl.activeMenu].join(" ") : cl.dropDownMenu}>
                <div
                    onClick={remove}
                    className={cl.menuItem}
                >
                    <div className={cl.menuItem_icon}>
                        <img src={deleteImg} alt="delete category"/>
                    </div>
                    <div>
                        Удалить
                    </div>
                </div>
                <hr/>
                <div onClick={edit}
                     className={cl.menuItem}>
                    <div className={cl.menuItem_icon}>
                        <img src={editImg} alt="edit category"/>
                    </div>
                    <div>
                        Редактировать
                    </div>
                </div>
            </div>
        </button>
    );
};

export default MoreButton;