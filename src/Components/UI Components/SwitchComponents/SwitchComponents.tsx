import React, {FC, ReactElement} from 'react';
import {CSSTransition, SwitchTransition} from "react-transition-group";
import cl from './switchComponets.module.css'

interface SwitchComponentsProps {
    SwitchComponent: ReactElement;
    SwitchedComponent: ReactElement;
    switchKey: boolean;
    children?: ReactElement;
}

const SwitchComponents: FC<SwitchComponentsProps> = (
    {SwitchComponent, SwitchedComponent,  switchKey, children }
) => {

    return (
        <div className={cl.content}>
            <div>
                {children && children}
            </div>
            <SwitchTransition>
                <CSSTransition
                    key={switchKey? 1: 0}
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