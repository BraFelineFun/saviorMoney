import React, {FC} from 'react';
import cl from "./switchComponets.module.css";
const back = require('../../../Resources/img/back.png');


interface SwitchButtonProps {
    isSwitched: boolean;
    onSwitch: () => void;
    children: string;
}

const SwitchButton: FC<SwitchButtonProps> = ({isSwitched, onSwitch, children}) => {

    return (
        <button
            onClick={onSwitch}
            className={cl.navigation}
        >
            <label>
                {!isSwitched?
                    children:
                    'Назад'
                }
            </label>
            <img
                className={!isSwitched?
                    [cl.arrow, cl.arrow_forward].join(" "):
                    cl.arrow
                }
                src={back}
                alt="back arrow"
            />
        </button>
    );
};

export default SwitchButton;