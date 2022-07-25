import React from 'react';
import cl from "./Pie.module.css";
import cashNumberToString from "../../Helpers/cashNumberToString";

const PieLabel = ({hoveredValue}) => {
    return (
        <div className={cl.labelPlaceholder}>
            <div className={cl.label}>
                <label>{hoveredValue.category}</label>
                <label>
                    {hoveredValue.summaryMoney !== ""?
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