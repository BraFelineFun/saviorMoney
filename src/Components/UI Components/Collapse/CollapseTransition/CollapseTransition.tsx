import React, {FC, ReactElement} from 'react';
import cl from './collapseTransition.module.css';
import {CSSTransition} from "react-transition-group";

interface CollapseTransitionProps {
    children: ReactElement;
    isExpanded: boolean;
}

const CollapseTransition: FC<CollapseTransitionProps> = ({children, isExpanded}) => {
    return (
        <CSSTransition
            in={isExpanded}
            timeout={500}
            unmountOnExit
            classNames={{
                enter: cl['expandList-enter'],
                enterActive: cl['expandList-enter-active'],
                exit: cl['expandList-exit'],
                exitActive: cl['expandList-exit-active']
            }}
        >
            <div className={cl.expandList}>
                <div className={cl.expandBody}>{children}</div>
            </div>
        </CSSTransition>
    );
};

export default CollapseTransition;