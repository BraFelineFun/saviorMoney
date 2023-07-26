import React, {FC} from 'react';
import cl from "./Pie.module.css";
import cashNumberToString from "../../Helpers/cashNumberToString";

interface PieLabelProps {
    category?: string;
    summaryMoney?: number;
}

const PieLabel: FC<PieLabelProps> = (hoveredValue) => {
    if (!hoveredValue) {
        hoveredValue = {category: '', summaryMoney: 0}
    }


    return (
        <div className={cl.labelPlaceholder}>
            <div className={cl.label}>
                <label>{hoveredValue.category}</label>
                <label>
                    {!!hoveredValue?.summaryMoney?
                        <div>
                            <div className="moneyDisplay">
                                {cashNumberToString(hoveredValue.summaryMoney)}
                            </div>
                            RUB
                        </div>

                        :
                        ""
                    }
                </label>
            </div>
        </div>
    );
};

export default PieLabel;