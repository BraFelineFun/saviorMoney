import React from 'react';
import {CSSTransition, SwitchTransition} from "react-transition-group";
import cl from './switchComponets.module.css'
import back from '../../../Resources/img/back.png'

const SwitchComponents = ({SwitchComponent, SwitchedComponent, switchKey, setSwitchKey, switchTitle}) => {

    return (
        <div className={cl.content}>
            <div className={cl.header}>
                <div className={cl.title}>
                    {switchKey &&
                        <h3>{switchTitle}</h3>
                    }
                </div>
                <div onClick={setSwitchKey}
                    className={cl.navigation}
                >
                    <label>
                        {!switchKey?
                            switchTitle:
                            <b>Назад</b>
                        }
                    </label>
                    <img
                        className={!switchKey?
                            [cl.arrow, cl.arrow_forward].join(" "):
                            cl.arrow
                        }
                        src={back}
                        alt="back arrow"
                    />
                </div>
            </div>
            <SwitchTransition>
                <CSSTransition
                    key={switchKey}
                    timeout={200}
                    classNames={{
                        enter: cl['fade-enter'],
                        enterActive: cl['fade-enter-active'],
                        exit: cl['fade-exit'],
                        exitActive: cl['fade-exit-active']
                    }}
                >
                    {switchKey?
                        <div>
                            {SwitchedComponent}
                        </div>
                        :
                        <div>
                            {SwitchComponent}
                        </div>
                    }
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};

export default SwitchComponents;