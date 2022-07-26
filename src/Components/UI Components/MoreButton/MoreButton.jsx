import React, {useEffect, useState} from 'react';
import cl from "./moreButton.module.css"
import editImg from "../../../Resources/img/edit.png"
import deleteImg from "../../../Resources/img/delete.png"

const MoreButton = ({removeCallback, editCallback}) => {

    const [isMenu, setIsMenu] = useState(false);

    useEffect(() => {
        const closeMenu = () => setIsMenu(false);
        document.addEventListener('click', closeMenu)
        return () =>{
            document.removeEventListener('click', closeMenu)
        }
    }, [])

    function toggleMenu(e){
        e.stopPropagation();
        setIsMenu(!isMenu);
    }
    function remove(e){
        e.stopPropagation();
        removeCallback()
    }
    function edit(e){
        e.stopPropagation();
        editCallback();
    }


    return (
        <>
            <div className={cl.moreButton}>
                <div onClick={toggleMenu}
                     className={cl.circleGroup}>
                    <span className={isMenu? [cl.circle, cl.activeMenuCircle].join(" "): cl.circle}></span>
                    <span className={isMenu? [cl.circle, cl.activeMenuCircle].join(" "): cl.circle}></span>
                    <span className={isMenu? [cl.circle, cl.activeMenuCircle].join(" "): cl.circle}></span>
                </div>
                <div className={isMenu? [cl.dropDownMenu, cl.activeMenu].join(" "): cl.dropDownMenu}>
                    <div onClick={remove}
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
            </div>
        </>
    );
};

export default MoreButton;