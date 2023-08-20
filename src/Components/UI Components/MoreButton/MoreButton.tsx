import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import cl from "./moreButton.module.css"
import assertIsNode from '../../../Helpers/assertEventTargetToNode';

interface MoreButtonProps {
    children: ReactElement;
}

const MoreButton: FC<MoreButtonProps> = ({children}) => {
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
        assertIsNode(e.target);
        setIsMenu(!isMenu);
    }


    return (
        <div className={cl.moreButtonWrapper}>
            <button className={cl.moreButton}>
                <div onClick={toggleMenu}
                     className={cl.circleGroup}
                     ref={menuButtonRef}
                >
                    <span className={isMenu ? [cl.circle, cl.activeMenuCircle].join(" ") : cl.circle}></span>
                    <span className={isMenu ? [cl.circle, cl.activeMenuCircle].join(" ") : cl.circle}></span>
                    <span className={isMenu ? [cl.circle, cl.activeMenuCircle].join(" ") : cl.circle}></span>
                </div>
            </button>
            <div className={isMenu ? [cl.dropDownMenu, cl.activeMenu].join(" ") : cl.dropDownMenu}>
                {children}
            </div>
        </div>
    );
};

export default MoreButton;