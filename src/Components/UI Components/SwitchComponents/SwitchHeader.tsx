import React, {FC} from 'react';
import cl from "./switchComponets.module.css";
import SwitchButton from "./SwitchButton";

interface SwitchHeaderProps {
    isSwitched: boolean;
    onSwitch: () => void;
    children: string;
}

const SwitchHeader: FC<SwitchHeaderProps> = ({isSwitched, onSwitch, children}) => {

    return (
        <div className={cl.header}>
            <div className={cl.title}>
                {isSwitched &&
                    <h3>{children}</h3>
                }
            </div>

            <SwitchButton isSwitched={isSwitched} onSwitch={onSwitch}>
                {children}
            </SwitchButton>
        </div>
    );
};

export default SwitchHeader;