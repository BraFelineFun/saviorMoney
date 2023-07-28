import React, {FC, ReactElement, useState} from 'react';
import cl from './collapse.module.css';
import CollapseTransition from "./CollapseTransition/CollapseTransition";
const arrow = require("../../../Resources/img/arrow-expand.png");

interface CollapseProps {
    title: string;
    children?: ReactElement;
}

const Collapse: FC<CollapseProps> = ({title, children}) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpandList = () => setIsExpanded(isExpanded => !isExpanded);

    return (
        <div className={cl.categoryList}>
            <div className={cl.categoryListTitle}
                 onClick={toggleExpandList}
            >
                <h3>{title}</h3>
                <img
                    className={isExpanded? cl.categoryExpandArrow: ""}
                    src={arrow}
                    alt="arrow to expand list"
                />
            </div>
            <CollapseTransition isExpanded={isExpanded}>
                <>
                    <hr/>
                    {children}
                </>
            </CollapseTransition>
        </div>
    );
};

export default Collapse;