import React, {useState} from 'react';
import cl from './collapse.module.css';
import arrow from "../../../Resources/img/arrow-expand.png";
import {CSSTransition} from "react-transition-group";

const Collapse = ({children}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpandList = () => setIsExpanded(isExpanded => !isExpanded);

    return (
        <div className={cl.categoryList}>
            <div className={cl.categoryListTitle}
                 onClick={toggleExpandList}
            >
                <h3>Категории:</h3>
                <img
                    className={isExpanded? cl.categoryExpandArrow: ""}
                    src={arrow}
                    alt="arrow to expand list"
                />
            </div>
            <CSSTransition
                in={isExpanded}
                timeout={500}
                unmountOnExit
                classNames={{
                    enter: cl['expandList-enter'],
                    enterActive: cl['expandList-enter-active'],
                    enterDone: cl['.expandList-enter-done'],
                    exit: cl['expandList-exit'],
                    exitActive: cl['expandList-exit-active']
                }}
            >
                <div className={cl.expandList}>
                    <div className={cl.expandBody}>
                        <hr/>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Collapse;