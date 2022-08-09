import React, {useState} from 'react';
import cl from './RoundButton.module.css'
import {CSSTransition, SwitchTransition} from "react-transition-group";
const RoundButton = ({callback}) => {
    const [state, setState] = useState(false);
    return (
        <SwitchTransition>
            <CSSTransition key={state} classNames="expandWidth" timeout={200}>

                    <div onClick={callback} className={cl.round}>

                        <label>{state && "назад"}</label>
                        <span onClick={()=> setState(!state)} className={cl.plus}></span>

                    </div>

            </CSSTransition>
        </SwitchTransition>
    );
};

export default RoundButton;